import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CreateDialogForm } from "@/components/dialog-form";
import { InputFormikField, SelectObjectFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { checkProductNameExist, createProduct } from "@/redux/product/product.thunk";
import {
  CheckProductNameExistResponse,
  CreateProductPayload,
  CreateProductResponse,
  ProductState,
} from "@/redux/product/product.type";
import { ImageFormikField } from "@/components/formik-fields/ImageFormikField";
import { Category } from "@/types/category";
import { getListCategory } from "@/redux/category/category.thunk";

const initialValues: CreateProductPayload = {
  name: "",
  description: "",
  category: "",
  subCategory: null,
  thumbnail: null,
};

const createProductSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  description: Yup.string().required().min(30).max(3000),
  category: Yup.string().required(),
  subCategory: Yup.string().nullable().default(null),
  thumbnail: Yup.mixed<File>().required(),
});

type CreateProductDialogFormProps = {
  children?: ReactNode;
  open?: false;
  onOpenChange?: (value: boolean) => void;
};

export function CreateProductDialogForm({ children, open, onOpenChange }: CreateProductDialogFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector<ProductState>((selector) => selector.product);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSubmit = async (values: CreateProductPayload, { resetForm }: FormikHelpers<CreateProductPayload>) => {
    try {
      const response: CreateProductResponse = await dispatch(createProduct(values)).unwrap();
      resetForm();
      const { data: product, message } = response;
      toast({ title: message });
      navigate(`/products/${product.id}/settings`);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueName = async (values: CreateProductPayload) => {
    const errors: { [key: string]: string } = {};

    const response: CheckProductNameExistResponse = await dispatch(
      checkProductNameExist({ name: values.name })
    ).unwrap();

    if (response.data) {
      errors.name = "Product name already exists";
    }

    return errors;
  };

  useEffect(() => {
    (async () => {
      const response = await dispatch(getListCategory({ page: 1, limit: 100 })).unwrap();
      setCategories(response.data.list);
    })();
  }, []);

  return (
    <CreateDialogForm
      title="Add New Product"
      open={open}
      trigger={children}
      onOpenChange={onOpenChange}
      initialValues={initialValues}
      validationSchema={createProductSchema}
      extendSchema={checkUniqueName}
      onSubmit={handleSubmit}
      loading={loading.checkProductNameExist || loading.createProduct}
    >
      {(formik: ReturnType<typeof useFormik<CreateProductPayload>>) => {
        console.log(formik.errors);
        return (
          <Fragment>
            <ImageFormikField size={120} name="thumbnail" label="Promotion Image" required formikProps={formik} />

            <InputFormikField name="name" type="text" label="Name" required formikProps={formik} />

            <InputFormikField name="description" type="textarea" label="Description" required formikProps={formik} />

            <SelectObjectFormikField
              label="Category"
              name="category"
              options={categories.map((item) => ({ value: item.id, title: item.name }))}
              required
              formikProps={formik}
            />

            <SelectObjectFormikField
              label="Subcategory"
              name="subCategory"
              options={
                categories
                  .find((item) => item.id === formik.values.category)
                  ?.children.map((item) => ({ value: item.id, title: item.name })) ?? []
              }
              formikProps={formik}
            />
          </Fragment>
        );
      }}
    </CreateDialogForm>
  );
}
