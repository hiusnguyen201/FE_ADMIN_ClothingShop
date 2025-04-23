import * as Yup from "yup";
import { GENDER, User } from "@/types/user";
import { EditProfilePayload, AccountState } from "@/redux/account/account.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { editProfile } from "@/redux/account/account.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField, SelectBoxFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { REGEX_PATTERNS } from "@/types/constant";
import { ImageFormikField } from "@/components/formik-fields/ImageFormikField";

const editProfileSchema = Yup.object().shape({
  avatar: Yup.mixed<File>().nullable(),
  name: Yup.string().required().min(3).max(50),
  phone: Yup.string()
    .required()
    .matches(REGEX_PATTERNS.PHONE_NUMBER["VN"], { message: "phone is not Vietnam phone number" }),
  gender: Yup.string()
    .required()
    .oneOf([...Object.values(GENDER)], { message: "gender is required" }),
});

export function EditProfileForm({ account }: { account: User }) {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector<AccountState>((selector) => selector.account);

  const initialValues: EditProfilePayload = {
    id: account.id,
    avatar: user?.avatar || account.avatar,
    name: user?.name || account.name,
    phone: user?.phone || account.phone,
    gender: user?.gender || account.gender,
  };

  const handleSubmit = async (values: EditProfilePayload, { resetForm }: FormikHelpers<EditProfilePayload>) => {
    try {
      await dispatch(editProfile(values)).unwrap();
      resetForm();
      toast({ title: "Edit account successful" });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const formik: FormikProps<EditProfilePayload> = useFormik({
    initialValues,
    validationSchema: editProfileSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form">
      <FlexBox className="sm:flex-row sm:justify-between">
        <div className="w-full sm:w-auto flex items-center justify-center">
          <ImageFormikField hint={false} size={200} className="rounded-full" name="avatar" formikProps={formik} />
        </div>

        <div className="w-full flex flex-col gap-5 max-w-[600px]">
          <InputFormikField label="Name" name="name" type="text" required formikProps={formik} />

          <div className="w-full text-sm">
            <label htmlFor="email" className="block font-medium mb-2">
              Email *
            </label>
            <div className="flex items-center">
              <div className="bg-gray-100 rounded px-3 py-2 flex-1 h-10 flex items-center">{account.email}</div>
            </div>
          </div>

          <InputFormikField label="Phone" name="phone" type="tel" required formikProps={formik} />

          <SelectBoxFormikField
            name="gender"
            type="radio"
            label="Gender"
            options={Object.values(GENDER)}
            required
            formikProps={formik}
          />

          <div className="flex items-center justify-end">
            <LoadingButton loading={loading.editProfile} disabled={loading.editProfile}>
              Save
            </LoadingButton>
          </div>
        </div>
      </FlexBox>
    </FlexBox>
  );
}
