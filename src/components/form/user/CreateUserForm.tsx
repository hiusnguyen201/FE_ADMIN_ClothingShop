import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { InputFormikField, SelectBoxFormikField, SelectObjectFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { checkEmailExist, createUser } from "@/redux/user/user.thunk";
import { CheckEmailExistResponse, CreateUserPayload, CreateUserResponse } from "@/redux/user/user.type";
import { GENDER } from "@/types/user";
import { REGEX_PATTERNS } from "@/types/constant";
import { getListRole } from "@/redux/role/role.thunk";
import { RoleState } from "@/redux/role/role.type";
import { Button } from "@/components/ui/button";

const initialValues: CreateUserPayload = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  roleId: null,
};

const createUserSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  email: Yup.string().required().email(),
  phone: Yup.string()
    .required()
    .matches(REGEX_PATTERNS.PHONE_NUMBER["VN"], { message: "phone is not Vietnam phone number" }),
  gender: Yup.string()
    .required()
    .oneOf([...Object.values(GENDER)], { message: "gender is required" }),
  roleId: Yup.string().nullable().optional(),
});

export function CreateUserForm() {
  const dispatch = useAppDispatch();
  const { list: listRole } = useAppSelector<RoleState>((selector) => selector.role);
  const [openSelectRole, setOpenSelectRole] = useState(false);

  const handleSubmit = async (values: CreateUserPayload, { resetForm }: FormikHelpers<CreateUserPayload>) => {
    try {
      const response: CreateUserResponse = await dispatch(createUser(values)).unwrap();
      resetForm();
      toast({
        title: "Create user successful",
        action: (
          <Link to={`/users/${response.data.id}/settings`}>
            <Button size="sm" className="underline h-8 gap-1">
              View Details
            </Button>
          </Link>
        ),
      });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueEmail = async (values: CreateUserPayload) => {
    const errors: { [key: string]: string } = {};

    const response: CheckEmailExistResponse = await dispatch(checkEmailExist({ email: values.email })).unwrap();
    if (response.data) {
      errors.email = "Email already exists";
    }

    return errors;
  };

  useEffect(() => {
    (async () => {
      await dispatch(getListRole({ page: 1, limit: 100 })).unwrap();
    })();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: createUserSchema,
    validate: async (values) => {
      const isValid = await createUserSchema.isValid(values);
      if (!isValid) return;
      return await checkUniqueEmail(values);
    },
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-[600px] flex flex-col gap-5">
      <InputFormikField name="name" type="text" label="Name" required formikProps={formik} />

      <InputFormikField name="email" type="email" label="Email" required formikProps={formik} />

      <InputFormikField name="phone" type="tel" label="Phone" required formikProps={formik} />

      <SelectBoxFormikField
        name="gender"
        type="radio"
        label="Gender"
        options={Object.values(GENDER)}
        required
        formikProps={formik}
      />

      <SelectObjectFormikField
        switchable
        open={openSelectRole}
        onOpenChange={setOpenSelectRole}
        label="Role"
        placeHolder="Select a role"
        name="roleId"
        options={listRole.map((item) => ({ value: item.id, title: item.name }))}
        formikProps={formik}
      />

      <div>
        <Button className="min-w-[100px]">Create</Button>
      </div>
    </form>
  );
}
