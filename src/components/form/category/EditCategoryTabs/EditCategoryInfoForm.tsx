import * as Yup from "yup";
import { Category } from "@/types/category";
import {
  EditCategoryInfoPayload,
  EditCategoryInfoResponse,
  CategoryState,
  CheckCategoryNameExistResponse,
} from "@/redux/category/category.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { checkCategoryNameExist, editCategoryInfo } from "@/redux/category/category.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { ImageFormikField } from "@/components/formik-fields/ImageFormikField";

const editCategoryInfoSchema = Yup.object().shape({
  image: Yup.mixed<File>().required(),
  name: Yup.string().required().min(3).max(50),
  parentId: Yup.string().required().nullable(),
});

export function EditCategoryInfoForm({ category }: { category: Category }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<CategoryState>((selector) => selector.category);

  const initialValues: EditCategoryInfoPayload = {
    id: category.id,
    image: category.image,
    name: category.name,
    parentId: category.parent,
  };

  const handleSubmit = async (
    values: EditCategoryInfoPayload,
    { resetForm }: FormikHelpers<EditCategoryInfoPayload>
  ) => {
    try {
      const response: EditCategoryInfoResponse = await dispatch(editCategoryInfo(values)).unwrap();
      resetForm({
        values: { ...values, image: response.data.image, name: response.data.name, parentId: response.data.parent },
      });
      toast({ title: "Edit category successful" });
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
  });

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form" className="max-w-[600px]">
      <FlexBox>
        <ImageFormikField size={120} name="image" label="Image" required formikProps={formik} />

        <InputFormikField label="Name" name="name" type="text" required formikProps={formik} />
      </FlexBox>

      <LoadingButton loading={loading.editCategory} disabled={loading.editCategory}>
        Save
      </LoadingButton>
    </FlexBox>
  );
}
