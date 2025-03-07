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
import AlertDialogCustom from "@/components/AlertDialogCustom";
import _ from "lodash";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateRoleById } from "@/lib/slices/role.slice";
import { useAppDispatch } from "@/lib/hooks";
import { checkRoleName } from "@/api/role.api";
import { useDebouncedCallback } from "use-debounce";
import { Textarea } from "@/components/ui/textarea";

const UpdateRoleSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "too short!")
    .max(50, "too long!"),
  description: Yup.string(),
  isActive: Yup.string(),
  permissions: Yup.array(),
});

export default function EditRolePage({ data, allPermissions }) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.role);
  const [tab, setTab] = React.useState("updateRole");

  const formik = useFormik({
    initialValues: {
      name: data.name || "",
      description: data.description || "",
      permissions: data.permissions || [],
      isActive: data.isActive || false,
    },
    validationSchema: UpdateRoleSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const changedValues = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) =>
            key === "isActive" || // Always include isActive
            (value !== data[key] &&
              value !== "" &&
              value !== null &&
              value !== undefined &&
              !(Array.isArray(value) && value.length === 0))
        )
      );

      if (Object.keys(changedValues).length > 0) {
        await dispatch(updateRoleById(data._id, changedValues));
        if (error !== null) {
          toast({
            title: "Error!",
            description: "Created role failed, Please try again!",
            variant: "destructive",
          });
          setFieldError("icon", error.message);
        }
        if (error === null) {
          toast({
            title: "Success!",
            description: "Role created successfully.",
            variant: "success",
          });
          resetForm();
          navigate(`/admin/roles`);
        }
      }
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

  const checkRoleNameDebounce = useDebouncedCallback(async () => {
    const response = await checkRoleName(formik.values.name);
    if (response.data.data === true && formik.values.name !== data.name) {
      setFieldError("name", "Name already exist!");
    }
  }, 400);

  React.useEffect(() => {
    checkRoleNameDebounce();
  }, [formik.values.name]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex justify-center h-full p-4 md:px-6">
        <Tabs className="w-[400px]" value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="updateRole">INFO</TabsTrigger>
            <TabsTrigger value="updateRolePermission">PERMISSION</TabsTrigger>
          </TabsList>
          <TabsContent value="updateRole">
            <Card className="w-full max-w-5xl">
              <CardHeader>
                <CardTitle>Update Roles</CardTitle>
                <CardDescription>Edit role for user</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Textarea
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
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      type="text"
                      {...getFieldProps("description")}
                    />
                    {touched.description && errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description}
                      </p>
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
                <Button
                  type="button"
                  onClick={() => setTab("updateRolePermission")}
                  variant="outline"
                >
                  Next
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="updateRolePermission">
            <Card className="w-full max-w-5xl">
              <CardHeader>
                <CardTitle>Add Permissions</CardTitle>
                <CardDescription>Add permissions for role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="permissions">Permissions</Label>
                    {_.chain(allPermissions)
                      .groupBy("module")
                      .map((items, module) => (
                        <div key={module}>
                          <h3 className="font-bold">{module}</h3>
                          {_.sortBy(items, "name").map((item) => (
                            <div
                              className="flex items-center gap-2"
                              key={item._id}
                            >
                              <Checkbox
                                id={item._id}
                                checked={formik.values.permissions.includes(
                                  item._id
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFieldValue("permissions", [
                                      ...formik.values.permissions,
                                      item._id,
                                    ]);
                                  } else {
                                    setFieldValue(
                                      "permissions",
                                      formik.values.permissions.filter(
                                        (id) => id !== item._id
                                      )
                                    );
                                  }
                                }}
                              />
                              <label
                                htmlFor={item._id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {item.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))
                      .value()}

                    {touched.permissions && errors.permissions && (
                      <p className="text-red-500 text-sm">{errors.status}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setTab("updateRole")}
                  variant="outline"
                >
                  Prev
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex justify-between p-4 bg-gray-100">
        <div className="justify-start">
          <Button
            type="button"
            className="bg-red-500 text-white"
            onClick={() => navigate("/admin/roles")}
          >
            Cancel
          </Button>
        </div>
        <div className="justify-end flex gap-4">
          <Button
            type="submit"
            onClick={() => {
              setFieldValue("isActive", true);
            }}
            className="bg-green-400 text-white"
          >
            Update with status Active
          </Button>
          <Button
            type="submit"
            onClick={() => {
              setFieldValue("isActive", false);
            }}
            className="bg-yellow-400 text-white"
          >
            Update with status Inactive
          </Button>
        </div>
      </div>
    </form>
  );
}
