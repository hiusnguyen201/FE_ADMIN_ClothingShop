import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { Link } from "react-router-dom";
import { Fragment, ReactNode, useState } from "react";
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
import { Category } from "@/types/category";
import { Button } from "@/components/ui/button";

const createCategorySchema = Yup.object().shape({
  image: Yup.mixed<File>().required(),
  name: Yup.string().required().min(3).max(50),
  parentId: Yup.string().required().nullable(),
});

type CreateCategoryDialogFormProps = {
  children?: ReactNode;
  parent?: Category;
};

export function CreateCategoryDialogForm({ children, parent }: CreateCategoryDialogFormProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<CategoryState>((selector) => selector.category);
  const [internalOpen, setInternalOpen] = useState(false);

  const initialValues: CreateCategoryPayload = {
    image: null,
    name: "",
    parentId: parent?.id || null,
  };

  const handleSubmit = async (values: CreateCategoryPayload, { resetForm }: FormikHelpers<CreateCategoryPayload>) => {
    try {
      const response: CreateCategoryResponse = await dispatch(createCategory(values)).unwrap();
      resetForm();
      toast({
        title: "Create category successful",
        action: (
          <Link to={`/categories/${response.data.id}/settings`}>
            <Button size="sm" className="underline h-8 gap-1">
              View Details
            </Button>
          </Link>
        ),
      });
      setInternalOpen(false);
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
      trigger={children}
      open={internalOpen}
      onOpenChange={setInternalOpen}
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
