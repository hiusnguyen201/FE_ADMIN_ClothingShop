import * as Yup from "yup";
import { Role } from "@/types/role";
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
});

export function EditRoleInfoForm({ role }: { role: Role }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);

  const initialValues: EditRoleInfoPayload = {
    id: role.id,
    name: role.name,
    description: role.description,
  };

  const handleSubmit = async (values: EditRoleInfoPayload, { resetForm }: FormikHelpers<EditRoleInfoPayload>) => {
    try {
      const response: EditRoleInfoResponse = await dispatch(editRoleInfo(values)).unwrap();
      resetForm();
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
    enableReinitialize: true,
  });

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form" className="max-w-[600px]">
      <FlexBox>
        <InputFormikField label="Name" name="name" type="text" required formikProps={formik} />

        <InputFormikField label="Description" name="description" type="text" required formikProps={formik} />
      </FlexBox>

      <LoadingButton loading={loading.editRole} disabled={loading.editRole}>
        Save
      </LoadingButton>
    </FlexBox>
  );
}
