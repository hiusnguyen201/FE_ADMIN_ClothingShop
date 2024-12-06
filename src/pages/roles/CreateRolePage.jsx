import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { ArrowLeftFromLine } from 'lucide-react';
import { Link } from "react-router-dom";
import AlertDialogCustom from "../../components/AlertDialogCustom";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
export default function CreateRolePage() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      createUser(values.username, values.email);
    },
  });
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Roles</CardTitle>
            <CardDescription>Create role for user</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    label="email"
                    type="email"
                    variant="standard"
                    {...formik.getFieldProps("email")}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Name">Name</Label>
                  <Input
                    id="username"
                    username="username"
                    label="username"
                    variant="standard"
                    {...formik.getFieldProps("username")}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">

            <AlertDialogCustom alertlink="/manageroles" alerttrigger="Back" alerttitle="back to prev page" alertdescription="All you do will destroy"/>
            <Button type="submit" variant="outline">Create</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
