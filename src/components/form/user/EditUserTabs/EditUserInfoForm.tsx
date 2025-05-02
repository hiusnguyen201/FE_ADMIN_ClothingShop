import * as Yup from "yup";
import { GENDER, User } from "@/types/user";
import { CheckEmailExistResponse, EditUserInfoPayload, UserState } from "@/redux/user/user.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { checkEmailExist, editUserInfo } from "@/redux/user/user.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField, SelectBoxFormikField, SelectObjectFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { REGEX_PATTERNS } from "@/types/constant";
import { RoleState } from "@/redux/role/role.type";
import { getListRole } from "@/redux/role/role.thunk";
import { useEffect, useState } from "react";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

const editUserInfoSchema = Yup.object().shape({
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

type EditUserInfoFormProps = { user: User; canEdit: boolean };

export function EditUserInfoForm({ user, canEdit }: EditUserInfoFormProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<UserState>((selector) => selector.user);
  const { loading: roleLoading, list: listRole } = useAppSelector<RoleState>((selector) => selector.role);
  const [editing, setEditing] = useState<boolean>(false);

  const handleToggleEditing = () => {
    setEditing(!editing);
  };

  const initialValues: EditUserInfoPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    roleId: (user.role as unknown as string) || null,
  };

  const handleSubmit = async (values: EditUserInfoPayload, { resetForm }: FormikHelpers<EditUserInfoPayload>) => {
    if (!canEdit) return;
    try {
      await dispatch(editUserInfo(values)).unwrap();
      resetForm();
      toast({ title: "Edit user successful" });
      setEditing(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueEmail = async (values: EditUserInfoPayload) => {
    if (!values.email || values.email === initialValues.email) return;
    const errors: { [key: string]: string } = {};

    const response: CheckEmailExistResponse = await dispatch(checkEmailExist({ email: values.email })).unwrap();
    if (response.data) {
      errors.email = "Email already exists";
    }

    return errors;
  };

  const formik: FormikProps<EditUserInfoPayload> = useFormik({
    initialValues,
    validationSchema: editUserInfoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validate: checkUniqueEmail,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!canEdit) return;
    (async () => {
      await dispatch(getListRole({ page: 1, limit: 100 })).unwrap();
    })();
  }, []);

  return (
    <FlexBox size="large">
      <Heading
        level={2}
        title="Personal Details"
        description="Enter your basic information and contact details to complete your profile registration."
        actionRight={
          canEdit &&
          !editing && (
            <Button onClick={handleToggleEditing} type="button">
              <Pen /> Edit
            </Button>
          )
        }
      />

      <FlexBox
        size="large"
        onSubmit={formik.handleSubmit}
        component={canEdit ? "form" : "div"}
        className="md:max-w-[600px]"
      >
        <FlexBox>
          <InputFormikField editing={editing} label="Name" name="name" type="text" required formikProps={formik} />

          <InputFormikField editing={editing} label="Email" name="email" type="email" required formikProps={formik} />

          <InputFormikField editing={editing} label="Phone" name="phone" type="tel" required formikProps={formik} />

          <SelectBoxFormikField
            editing={editing}
            name="gender"
            type="radio"
            label="Gender"
            options={Object.values(GENDER)}
            required
            formikProps={formik}
          />

          <SelectObjectFormikField
            editing={editing}
            switchable
            label="Role"
            placeHolder="Select a role"
            name="roleId"
            loading={roleLoading.getListRole}
            options={listRole.map((item) => ({ value: item.id, title: item.name }))}
            formikProps={formik}
          />
        </FlexBox>

        {canEdit && editing && (
          <div className="flex w-full sm:flex-row flex-col items-center gap-3">
            <LoadingButton onClick={handleToggleEditing} variant="outline" type="button" disabled={loading.editUser}>
              Cancel
            </LoadingButton>
            <LoadingButton loading={loading.editUser} disabled={loading.editUser}>
              Save
            </LoadingButton>
          </div>
        )}
      </FlexBox>
    </FlexBox>
  );
}
