import * as Yup from "yup";
import { Role } from "@/types/role";
import { CheckRoleNameExistResponse, EditRoleInfoPayload, RoleState } from "@/redux/role/role.type";
import { checkRoleNameExistService } from "@/redux/role/role.service";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { editRoleInfo } from "@/redux/role/role.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { useState } from "react";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

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

export function EditRoleInfoForm({ role, canEdit }: { role: Role; canEdit: boolean }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<RoleState>((selector) => selector.role);
  const [editing, setEditing] = useState<boolean>(false);

  const handleToggleEditing = () => {
    setEditing(!editing);
  };

  const initialValues: EditRoleInfoPayload = {
    id: role.id,
    name: role.name,
    description: role.description,
  };

  const handleSubmit = async (values: EditRoleInfoPayload, { resetForm }: FormikHelpers<EditRoleInfoPayload>) => {
    if (!canEdit) return;
    try {
      await dispatch(editRoleInfo(values)).unwrap();
      resetForm();
      toast({ title: "Edit role successful" });
      setEditing(false);
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
    <FlexBox>
      <Heading
        level={2}
        title="Role Information"
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
        component={editing && canEdit ? "form" : "div"}
        className="md:max-w-[600px]"
      >
        <FlexBox>
          <InputFormikField editing={editing} label="Name" name="name" type="text" required formikProps={formik} />

          <InputFormikField
            editing={editing}
            label="Description"
            name="description"
            type="text"
            required
            formikProps={formik}
          />
        </FlexBox>

        {canEdit && editing && (
          <div className="flex w-full sm:flex-row flex-col items-center gap-3">
            <LoadingButton onClick={handleToggleEditing} variant="outline" type="button" disabled={loading.editRole}>
              Cancel
            </LoadingButton>
            <LoadingButton loading={loading.editRole} disabled={loading.editRole}>
              Save
            </LoadingButton>
          </div>
        )}
      </FlexBox>
    </FlexBox>
  );
}
