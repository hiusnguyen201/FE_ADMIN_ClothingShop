import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { Link } from "react-router-dom";
import { Fragment, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField, SelectBoxFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { createCustomer } from "@/redux/customer/customer.thunk";
import { CreateCustomerPayload, CreateCustomerResponse, CustomerState } from "@/redux/customer/customer.type";
import { GENDER } from "@/types/customer";
import { REGEX_PATTERNS } from "@/types/constant";
import { CheckEmailExistResponse, UserState } from "@/redux/user/user.type";
import { checkEmailExist } from "@/redux/user/user.thunk";
import { Button } from "@/components/ui/button";

const initialValues: CreateCustomerPayload = {
  name: "",
  email: "",
  phone: "",
  gender: "",
};

const createCustomerSchema = Yup.object().shape({
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

type CreateCustomerDialogFormProps = {
  children?: ReactNode;
};

export function CreateCustomerDialogForm({ children }: CreateCustomerDialogFormProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<CustomerState>((selector) => selector.customer);
  const { loading: loadingUser } = useAppSelector<UserState>((selector) => selector.user);
  const [internalOpen, setInternalOpen] = useState(false);

  const handleSubmit = async (values: CreateCustomerPayload, { resetForm }: FormikHelpers<CreateCustomerPayload>) => {
    try {
      const response: CreateCustomerResponse = await dispatch(createCustomer(values)).unwrap();
      resetForm();
      toast({
        title: "Create customer successful",
        action: (
          <Link to={`/customers/${response.data.id}/settings`}>
            <Button size="sm" className="underline h-8 gap-1">
              View Details
            </Button>
          </Link>
        ),
      });
      setInternalOpen(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueEmail = async (values: CreateCustomerPayload) => {
    const errors: { [key: string]: string } = {};

    const response: CheckEmailExistResponse = await dispatch(checkEmailExist({ email: values.email })).unwrap();
    if (response.data) {
      errors.email = "Email already exists";
    }

    return errors;
  };

  return (
    <CreateDialogForm
      title="Create Customer"
      trigger={children}
      open={internalOpen}
      onOpenChange={setInternalOpen}
      initialValues={initialValues}
      validationSchema={createCustomerSchema}
      extendSchema={checkUniqueEmail}
      onSubmit={handleSubmit}
      loading={loadingUser.checkEmailExist || loading.createCustomer}
    >
      {(formik: ReturnType<typeof useFormik<CreateCustomerPayload>>) => (
        <Fragment>
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
        </Fragment>
      )}
    </CreateDialogForm>
  );
}
