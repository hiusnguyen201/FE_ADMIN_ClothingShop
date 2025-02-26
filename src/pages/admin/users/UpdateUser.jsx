
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { updateUser, getUserById } from "@/lib/slices/userSlice";

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { currentUser, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthday: "",
      gender: "",
      avatar: null,
    },
    
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required!")
        .min(2, "Name must be at least 2 characters!")
        .max(50, "Name can't be longer than 50 characters!"),
      email: Yup.string().email("Invalid email format").required("Email is required!"),
      birthday: Yup.date().required("Date of birth is required!"),
      gender: Yup.string().required("Gender is required!"),
      avatar: Yup.mixed().test(
        "fileFormat",
        "Unsupported file format. Only images are allowed.",
        (value) =>
          !value ||
          (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
      ),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("birthday", values.birthday);
        formData.append("gender", values.gender);
        if (values.avatar) {
          formData.append("avatar", values.avatar);
        }

        await dispatch(updateUser({ id: userId, formData })).unwrap();
        setShowAlert(true)
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    },
  });

  useEffect(() => {
    if (currentUser?.data) {
      const userData = currentUser.data;
      formik.setValues({
        name: userData.name || "",
        email: userData.email || "",
        birthday: userData.birthday || "",
        gender: userData.gender || "",
        avatar: null,
      });
      setAvatarPreview(userData.avatarUrl);
      if (userData.birthday) {
        setDate(new Date(userData.birthday));
      }
    }
  }, [currentUser]);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      formik.setFieldValue("avatar", file);
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - (currentYear - 100) + 1 },
    (_, i) => currentYear - 100 + i
  );

  const handleMonthChange = (month) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year) => {
    const newDate = setYear(date, parseInt(year));
    setDate(newDate);
  };

  const handleSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      formik.setFieldValue("birthday", format(selectedDate, "yyyy-MM-dd"));
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {showAlert && (
        <Alert className="bg-green-100 border-green-500 text-green-800">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            User updated successfully.
          </AlertDescription>
        </Alert>
      )}
      <h2 className="text-2xl font-bold">Update User</h2>
      {error && <div className="text-red-500">{error}</div>}
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full mt-2 object-cover"
            />
          )}
          {formik.errors.avatar && formik.touched.avatar && (
            <p className="text-red-500 text-sm">{formik.errors.avatar}</p>
          )}
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="birthday">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formik.values.birthday && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formik.values.birthday
                  ? format(new Date(formik.values.birthday), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="flex justify-around p-2">
                <Select
                  onValueChange={handleMonthChange}
                  value={months[getMonth(date)]}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={handleYearChange}
                  value={getYear(date).toString()}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                initialFocus
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
          {formik.errors.birthday && formik.touched.birthday && (
            <p className="text-red-500 text-sm">{formik.errors.birthday}</p>
          )}
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue("gender", value)}
            value={formik.values.gender}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.gender && formik.touched.gender && (
            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update User"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/admin/users")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;