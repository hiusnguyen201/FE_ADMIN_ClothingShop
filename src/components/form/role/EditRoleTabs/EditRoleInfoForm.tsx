import * as Yup from "yup";
import { Role, ROLE_STATUS } from "@/types/role";
import {
  CheckRoleNameExistResponse,
  EditRoleInfoPayload,
  EditRoleInfoResponse,
  RoleState,
} from "@/redux/role/role.type";
import { checkRoleNameExistService } from "@/redux/role/role.service";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { editRoleInfo } from "@/redux/role/role.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";

const editRoleInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3)
    .max(50)
    .test("uniqueRoleName", "Role name already exist", async function (name): Promise<boolean> {
      const defaultValue = this.options.context?.name as Yup.ValidateOptions<EditRoleInfoPayload>;
      if (defaultValue === name) return true;
      const response: CheckRoleNameExistResponse = await checkRoleNameExistService({ name });
      return !response.data;
    }),
  description: Yup.string().required().min(3).max(255),
  status: Yup.string().required().oneOf(Object.values(ROLE_STATUS)),
});

export function EditRoleInfoForm({ role }: { role: Role }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);

  const initialValues: EditRoleInfoPayload = {
    id: role.id,
    name: role.name,
    description: role.description,
    status: role.status,
  };

  const handleSubmit = async (values: EditRoleInfoPayload, { resetForm }: FormikHelpers<EditRoleInfoPayload>) => {
    try {
      const response: EditRoleInfoResponse = await dispatch(editRoleInfo(values)).unwrap();
      resetForm({ values: { ...values, ...response.data } });
      toast({ title: response.message });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const formik: FormikProps<EditRoleInfoPayload> = useFormik({
    initialValues,
    validationSchema: editRoleInfoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form" className="max-w-[600px]">
      <FlexBox>
        <InputFormikField
          label="Name"
          name="name"
          type="text"
          required
          formikProps={formik}
          disabled={loading.editRole}
        />

        <InputFormikField
          label="Description"
          name="description"
          type="text"
          required
          disabled={loading.editRole}
          formikProps={formik}
        />
      </FlexBox>

      <LoadingButton
        loading={loading.editRole || formik.isValidating}
        disabled={
          !formik.isValid || Object.keys(formik.touched).length === 0 || loading.editRole || formik.isValidating
        }
      >
        Save
      </LoadingButton>
    </FlexBox>
  );
}
