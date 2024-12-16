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
import { MultiSelect } from "@/components/MultiSelect";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRoleById } from "@/lib/slices/role.slice";

const CreateRoleSchema = Yup.object().shape({
  icon: Yup.string().required("Icon is required"),
  name: Yup.string()
    .required("Name is required")
    .min(3, "too short!")
    .max(50, "too long!"),
  description: Yup.string().min(3, "too short!").max(255, "too long!"),
  status: Yup.string().required("Status is required"),
  permissions: Yup.array(),
});

export default function EditRolePage({ data, fakePermissions }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      icon: data.icon || "",
      name: data.name || "",
      description: data.description || "",
      status: data.status || "",
      permissions: data.permissions || "",
    },
    validationSchema: CreateRoleSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      
    },
  });

  const { setFieldValue, handleSubmit, touched, errors, getFieldProps } =
    formik;

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Updagte Roles</CardTitle>
            <CardDescription>Updagte role for user</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="icon">Icon</Label>
                  <UploadImage
                    onValueChange={(value) => {
                      setFieldValue("icon", value);
                    }}
                    oldPicture={formik.values.icon}
                  />
                  {touched.icon && errors.icon && (
                    <p className="text-red-500 text-sm">{errors.icon}</p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    {...getFieldProps("name")}
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
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
                  <Label htmlFor="description">Status</Label>
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
                <div className="flex flex-col space-y-1.5">
                  <MultiSelect
                    options={fakePermissions}
                    onValueChange={(values) => {
                      setFieldValue("permissions", [values]);
                    }}
                    defaultValue={formik.values.permissions}
                    placeholder="Select permissions"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                  {touched.permissions && errors.permissions && (
                    <p className="text-red-500 text-sm">{errors.permissions}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialogCustom
                alertlink="/manageroles"
                alerttrigger="Back"
                alerttitle="back to prev page"
                alertdescription="All you do will destroy"
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
