import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ROLE_STATUS } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AlertDialogCustom from "@/components/AlertDialogCustom";

import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UploadImage from "@/components/UploadImage";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { createRole } from "@/lib/slices/role.slice";
import { MultiSelect } from "@/components/MultiSelect";
import { useNavigate } from "react-router-dom";
import { checkRoleName } from "@/api/role.api";
import { useDebouncedCallback } from "use-debounce";

const CreateRoleSchema = Yup.object().shape({
  icon: Yup.string(),
  name: Yup.string()
    .required("Name is required")
    .min(3, "too short!")
    .max(50, "too long!"),
  description: Yup.string(),
  status: Yup.string().required("Status is required"),
  permissions: Yup.array(),
});

const ROLE_PERMISSIONS = [
  { value: "6751aead482b468e0a350118", label: "update new 1" },
  { value: "6751b0e53fd7adbb4a5f8030", label: "delete user2" },
  { value: "6752fb037e4be1b3264733be", label: "delete user5" },
  { value: "6752fb395bc687bd4e693d74", label: "delete user6" },
];

export default function AddRolePage() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.role);

  const formik = useFormik({
    initialValues: {
      icon: "",
      name: "",
      description: "",
      status: "",
      permissions: [],
    },
    validationSchema: CreateRoleSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const filteredValues = Object.fromEntries(
        Object.entries(values).filter(
          ([_, value]) =>
            value !== "" &&
            value !== null &&
            value !== undefined &&
            !(Array.isArray(value) && value.length === 0)
        )
      );
        await dispatch(createRole(filteredValues));   
    },
  });
  
  const {
    setFieldValue,
    handleSubmit,
    touched,
    errors,
    getFieldProps,
    resetForm,
    setFieldTouched,
    isSubmitting,
    setFieldError,
  } = formik;

  React.useEffect(() => {
    if (isLoading || !isSubmitting) return;

    if (error !== null) {
      toast({
        title: "Error!",
        description: "Created role unsuccessfully",
        variant: "destructive",
      });
      setFieldError("name", error.message);
    }
    if (error === null) {
      toast({
        title: "Success!",
        description: "Role created successfully.",
        variant: "success",
      });
      resetForm();
      navigate(-1);
    }
  }, [isLoading]);

  const checkRoleNameDebounce = useDebouncedCallback(async () => {
    const response = await checkRoleName(formik.values.name);
    if (response.data.data === true) {
      setFieldError("name", "Name already exist!");
    }
  }, 400);

  React.useEffect(() => {
    checkRoleNameDebounce();
  }, [formik.values.name]);

  return (
    <>
      <div className="flex justify-center h-full p-4 md:px-6">
        <Card className="w-full max-w-5xl">
          <CardHeader>
            <CardTitle>Add Roles</CardTitle>
            <CardDescription>Add role for user</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="icon">Icon</Label>
                  <UploadImage
                    limitFile={1}
                    onValueChange={(value) => {
                      setFieldValue("icon", value);
                    }}
                    oldPicture={formik.values.icon}
                  />
                  {touched.icon && errors.icon && (
                    <p className="text-red-500 text-sm">{errors.icon}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      {...getFieldProps("name")}
                      onChange={(e) => {
                        setFieldTouched("name", true);
                        setFieldValue("name", e.target.value);
                      }}
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="permissions">Permissions</Label>
                    <MultiSelect
                      options={ROLE_PERMISSIONS}
                      onValueChange={(values) => {
                        setFieldValue("permissions", values);
                      }}
                      defaultValue={formik.values.permissions}
                      placeholder="Select permissions"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />

                    {touched.permissions && errors.permissions && (
                      <p className="text-red-500 text-sm">
                        {errors.permissions}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    {...getFieldProps("description")}
                  />
                  {touched.description && errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(selectOption) => {
                      setFieldValue("status", selectOption);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formik.values.status} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ROLE_STATUS).map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.status && errors.status && (
                    <p className="text-red-500 text-sm">{errors.status}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialogCustom
                alertlink="/admin/roles"
                alerttrigger="Back"
                alerttitle="Back to previous page"
                alertdescription="All you do will be lost"
              />
              <Button type="submit" variant="outline">
                Create
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
