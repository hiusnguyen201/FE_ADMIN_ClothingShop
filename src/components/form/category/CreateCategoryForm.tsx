import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Fragment, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { createCategory, checkCategoryNameExist } from "@/redux/category/category.thunk";
import {
  CheckCategoryNameExistResponse,
  CreateCategoryPayload,
  CreateCategoryResponse,
  CategoryState,
} from "@/redux/category/category.type";
import { ImageFormikField } from "@/components/formik-fields/ImageFormikField";

const MAXIMUM_CATEGORY_IMAGE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_CATEGORY_IMAGE_TYPE = ["image/jpeg", "image/png"];

const initialValues: CreateCategoryPayload = {
  image: null,
  name: "",
  parent: "",
};

const createCategorySchema = Yup.object().shape({
  image: Yup.mixed<File>()
    .required()
    .test("fileSize", "Too large", (value) => value.size <= MAXIMUM_CATEGORY_IMAGE_SIZE)
    .test("fileType", "Unsupported file format", (value) => ACCEPTED_CATEGORY_IMAGE_TYPE.includes(value?.type || "")),
  name: Yup.string().required(),
  parent: Yup.string(),
});

type CreateCategoryDialogFormProps = {
  children?: ReactNode;
  open?: false;
  onOpenChange?: (value: boolean) => void;
};

export function CreateCategoryDialogForm({ children, open, onOpenChange }: CreateCategoryDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<CategoryState>((selector) => selector.category);

  const handleSubmit = async (values: CreateCategoryPayload, { resetForm }: FormikHelpers<CreateCategoryPayload>) => {
    try {
      const response: CreateCategoryResponse = await dispatch(createCategory(values)).unwrap();
      resetForm();
      const { data: category, message } = response;
      toast({ title: message });
      navigate(`/categories/${category.id}/settings`);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueCategoryName = async (values: CreateCategoryPayload) => {
    const errors: { [key: string]: string } = {};

    const response: CheckCategoryNameExistResponse = await dispatch(
      checkCategoryNameExist({ name: values.name })
    ).unwrap();
    if (response.data) {
      errors.name = "Category name already exists";
    }

    return errors;
  };

  return (
    <CreateDialogForm
      title="Create Category"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      validationSchema={createCategorySchema}
      extendSchema={checkUniqueCategoryName}
      onSubmit={handleSubmit}
      loading={loading.checkCategoryNameExist || loading.createCategory}
    >
      {(formik: ReturnType<typeof useFormik<CreateCategoryPayload>>) => (
        <Fragment>
          <ImageFormikField size={120} name="image" label="Image" required formikProps={formik} />

          <InputFormikField name="name" type="text" label="Name" required formikProps={formik} />
        </Fragment>
      )}
    </CreateDialogForm>
  );
}
