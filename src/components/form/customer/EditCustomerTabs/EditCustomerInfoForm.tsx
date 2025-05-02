import * as Yup from "yup";
import { GENDER, Customer } from "@/types/customer";
import { EditCustomerInfoPayload, CustomerState } from "@/redux/customer/customer.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { editCustomerInfo } from "@/redux/customer/customer.thunk";
import { checkEmailExist } from "@/redux/user/user.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField, SelectBoxFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { REGEX_PATTERNS } from "@/types/constant";
import { CheckEmailExistResponse, UserState } from "@/redux/user/user.type";

const editCustomerInfoSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  email: Yup.string().required().email(),
  phone: Yup.string()
    .required()
    .matches(REGEX_PATTERNS.PHONE_NUMBER["VN"], { message: "phone is not Vietnam phone number" }),
  gender: Yup.string()
    .required()
    .oneOf([...Object.values(GENDER)], { message: "gender is required" }),
});

export function EditCustomerInfoForm({ customer }: { customer: Customer }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<CustomerState>((selector) => selector.customer);
  const { loading: loadingUser } = useAppSelector<UserState>((selector) => selector.user);

  const initialValues: EditCustomerInfoPayload = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    gender: customer.gender,
  };

  const handleSubmit = async (
    values: EditCustomerInfoPayload,
    { resetForm }: FormikHelpers<EditCustomerInfoPayload>
  ) => {
    try {
      await dispatch(editCustomerInfo(values)).unwrap();
      resetForm();
      toast({ title: "Edit customer successful" });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueEmail = async (values: EditCustomerInfoPayload) => {
    if (!values.email || values.email === initialValues.email) return;
    const errors: { [key: string]: string } = {};

    const response: CheckEmailExistResponse = await dispatch(checkEmailExist({ email: values.email })).unwrap();
    if (response.data) {
      errors.email = "Email already exists";
    }

    return errors;
  };

  const formik: FormikProps<EditCustomerInfoPayload> = useFormik({
    initialValues,
    validationSchema: editCustomerInfoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validate: checkUniqueEmail,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form" className="md:max-w-[600px]">
      <FlexBox>
        <InputFormikField label="Name" name="name" type="text" required formikProps={formik} />

        <InputFormikField label="Email" name="email" type="email" required formikProps={formik} />

        <InputFormikField label="Phone" name="phone" type="tel" required formikProps={formik} />

        <SelectBoxFormikField
          name="gender"
          type="radio"
          label="Gender"
          options={Object.values(GENDER)}
          required
          formikProps={formik}
        />
      </FlexBox>

      <LoadingButton loading={loading.editCustomer || loadingUser.checkEmailExist} disabled={loading.editCustomer}>
        Save
      </LoadingButton>
    </FlexBox>
  );
}
