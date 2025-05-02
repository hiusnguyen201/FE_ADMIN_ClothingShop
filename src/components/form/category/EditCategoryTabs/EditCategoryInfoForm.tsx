import * as Yup from "yup";
import { Category } from "@/types/category";
import { EditCategoryInfoPayload, CategoryState, CheckCategoryNameExistResponse } from "@/redux/category/category.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { checkCategoryNameExist, editCategoryInfo } from "@/redux/category/category.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { ImageFormikField } from "@/components/formik-fields/ImageFormikField";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Heading } from "@/components/Heading";

const editCategoryInfoSchema = Yup.object().shape({
  image: Yup.mixed<File>().required(),
  name: Yup.string().required().min(3).max(50),
  parentId: Yup.string().required().nullable(),
});

export function EditCategoryInfoForm({ category, canEdit }: { category: Category; canEdit: boolean }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<CategoryState>((selector) => selector.category);
  const [editing, setEditing] = useState<boolean>(false);

  const handleToggleEditing = () => {
    setEditing(!editing);
  };

  const initialValues: EditCategoryInfoPayload = {
    id: category.id,
    image: category.image,
    name: category.name,
    parentId: category.parent?.id ?? null,
  };

  const handleSubmit = async (
    values: EditCategoryInfoPayload,
    { resetForm }: FormikHelpers<EditCategoryInfoPayload>
  ) => {
    if (!canEdit) return;
    try {
      await dispatch(editCategoryInfo(values)).unwrap();
      resetForm();
      toast({ title: "Edit category successful" });
      setEditing(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueCategoryName = async (values: EditCategoryInfoPayload) => {
    if (!values.name || values.name === initialValues.name) return;
    const errors: { [key: string]: string } = {};

    const response: CheckCategoryNameExistResponse = await dispatch(
      checkCategoryNameExist({ name: values.name })
    ).unwrap();
    if (response.data) {
      errors.name = "name already exists";
    }

    return errors;
  };

  const formik: FormikProps<EditCategoryInfoPayload> = useFormik({
    initialValues,
    validationSchema: editCategoryInfoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validate: checkUniqueCategoryName,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FlexBox size="large">
      <Heading
        level={2}
        title="Category information"
        description="View and manage detailed information about this category, including its name, description, and related data."
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
          <ImageFormikField editing={editing} size={120} name="image" label="Image" required formikProps={formik} />

          <InputFormikField editing={editing} label="Name" name="name" type="text" required formikProps={formik} />
        </FlexBox>

        {canEdit && editing && (
          <div className="flex w-full sm:flex-row flex-col items-center gap-3">
            <LoadingButton
              onClick={handleToggleEditing}
              variant="outline"
              type="button"
              disabled={loading.editCategory}
            >
              Cancel
            </LoadingButton>
            <LoadingButton loading={loading.editCategory} disabled={loading.editCategory}>
              Save
            </LoadingButton>
          </div>
        )}
      </FlexBox>
    </FlexBox>
  );
}
