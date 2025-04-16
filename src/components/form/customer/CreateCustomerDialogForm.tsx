import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Fragment, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField, SelectBoxFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { createCustomer } from "@/redux/customer/customer.thunk";
import { CreateCustomerPayload, CreateCustomerResponse, CustomerState } from "@/redux/customer/customer.type";
import { GENDER } from "@/types/customer";
import { REGEX_PATTERNS } from "@/types/constant";
import { getListRole } from "@/redux/role/role.thunk";
import { CheckEmailExistResponse, UserState } from "@/redux/user/user.type";
import { checkEmailExist } from "@/redux/user/user.thunk";

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
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  finishRedirect?: boolean;
};

export function CreateCustomerDialogForm({
  children,
  open,
  onOpenChange,
  finishRedirect = true,
}: CreateCustomerDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<CustomerState>((selector) => selector.customer);
  const { loading: loadingUser } = useAppSelector<UserState>((selector) => selector.user);

  const handleSubmit = async (values: CreateCustomerPayload, { resetForm }: FormikHelpers<CreateCustomerPayload>) => {
    try {
      const response: CreateCustomerResponse = await dispatch(createCustomer(values)).unwrap();
      resetForm();
      const { data: customer, message } = response;
      toast({ title: message });
      if (finishRedirect) {
        navigate(`/customers/${customer.id}/settings`);
      }
      onOpenChange?.(false);
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

  useEffect(() => {
    (async () => {
      await dispatch(getListRole({ page: 1, limit: 100 })).unwrap();
    })();
  }, []);

  return (
    <CreateDialogForm
      title="Create Customer"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
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
