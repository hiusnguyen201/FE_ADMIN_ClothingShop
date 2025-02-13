import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "@/lib/slices/userSlice";

const AddUser = () => {
  const [date, setDate] = useState(new Date());
  const [avatarPreview, setAvatarPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "", 
      gender: "",
      avatar: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required!")
        .min(2, "Name must be at least 2 characters!")
        .max(50, "Name can't be longer than 50 characters!"),
      email: Yup.string().required("Email is required!"),
      phone: Yup.string().required("Phone is required!"),
      birthday: Yup.date().required("Date of birth is required!"),
      gender: Yup.string().required("Gender is required!"),
      avatar: Yup.mixed()
        .required("Avatar is required!")
        .test(
          "fileFormat",
          "Unsupported file format. Only images are allowed.",
          (value) =>
            !value ||
            (value &&
              ["image/jpeg", "image/png", "image/gif"].includes(value.type))
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("birthday", values.birthday);
        formData.append("gender", values.gender);
        formData.append("avatar", values.avatar);

       
        console.log(formData)
        await dispatch(createUser(formData));
        alert("User created successfully!");
        navigate("/admin/users");
      } catch (error) {
        console.error("Failed to create user:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      formik.setFieldValue("avatar", file);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 100 + i);

  const handleMonthChange = (month) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year) => {
    const newDate = setYear(date, parseInt(year, 10));
    setDate(newDate);
  };

  const handleSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
     
      const formattedDate = `${selectedDate.getFullYear()}-${(
        "0" + (selectedDate.getMonth() + 1)
      ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`;
      formik.setFieldValue("birthday", formattedDate);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Avatar Field */}
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

        {/* Name Field */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          )}
        </div>

        {/* Date of Birth Field */}
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
                <CalendarIcon className="mr-2" />
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
                month={date}
                onMonthChange={setDate}
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

        {/* Gender Field */}
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
              {/* Updated values to match backend enum */}
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {formik.errors.gender && formik.touched.gender && (
            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
          )}
        </div>

        <Button type="submit" className="w-auto px-4 py-2 text-sm">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
