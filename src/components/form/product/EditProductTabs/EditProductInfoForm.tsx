import * as Yup from "yup";
import { Product, PRODUCT_STATUS } from "@/types/product";
import { CheckProductNameExistResponse, EditProductInfoPayload, ProductState } from "@/redux/product/product.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { checkProductNameExist, editProductInfo } from "@/redux/product/product.thunk";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { toast } from "@/hooks/use-toast";
import { InputFormikField, SelectObjectFormikField } from "@/components/formik-fields";
import { LoadingButton } from "@/components/LoadingButton";
import { FlexBox } from "@/components/FlexBox";
import { useEffect, useState } from "react";
import { ImageFormikField } from "@/components/formik-fields/ImageFormikField";
import { getListCategory } from "@/redux/category/category.thunk";
import { Category } from "@/types/category";
import { useIsMobile } from "@/hooks/use-mobile";

const editProductInfoSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  description: Yup.string().required().min(30).max(3000),
  category: Yup.string().required(),
  subCategory: Yup.string().nullable().default(null),
  thumbnail: Yup.mixed<File>().required(),
  status: Yup.string().oneOf(Object.values(PRODUCT_STATUS)).required(),
});

export function EditProductInfoForm({ product }: { product: Product }) {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<ProductState>((selector) => selector.product);
  const [categories, setCategories] = useState<Category[]>([]);

  const initialValues: EditProductInfoPayload = {
    id: product.id,
    thumbnail: product.thumbnail,
    name: product.name,
    description: product.description,
    category: product.category,
    subCategory: product.subCategory,
    status: product.status,
  };

  const handleSubmit = async (values: EditProductInfoPayload, { resetForm }: FormikHelpers<EditProductInfoPayload>) => {
    try {
      await dispatch(editProductInfo(values)).unwrap();
      resetForm();
      toast({ title: "Edit product successful" });
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const checkUniqueName = async (values: EditProductInfoPayload) => {
    const errors: { [key: string]: string } = {};

    const response: CheckProductNameExistResponse = await dispatch(
      checkProductNameExist({ name: values.name, skipId: product.id })
    ).unwrap();

    if (response.data) {
      errors.name = "Product name already exists";
    }

    return errors;
  };

  const formik: FormikProps<EditProductInfoPayload> = useFormik({
    initialValues,
    validationSchema: editProductInfoSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validate: checkUniqueName,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    (async () => {
      const response = await dispatch(getListCategory({ page: 1, limit: 100 })).unwrap();
      setCategories(response.data.list);
    })();
  }, []);

  return (
    <FlexBox size="large" onSubmit={formik.handleSubmit} component="form">
      <FlexBox direction={isMobile ? "column" : "row"} className="justify-between flex-wrap" size="large">
        <ImageFormikField
          hintDirection={isMobile ? "right" : "bottom"}
          size={isMobile ? 120 : 240}
          name="thumbnail"
          label="Promotion Image"
          required
          formikProps={formik}
        />

        <FlexBox className="max-w-[600px]">
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

          <FlexBox direction="row">
            <LoadingButton
              onClick={() => {
                formik.setFieldValue("status", PRODUCT_STATUS.INACTIVE);
              }}
              loading={loading.editProductInfo}
              disabled={loading.editProductInfo}
            >
              Save & Inactive
            </LoadingButton>
            {product.productVariants.length > 0 && (
              <LoadingButton
                onClick={() => {
                  formik.setFieldValue("status", PRODUCT_STATUS.ACTIVE);
                }}
                loading={loading.editProductInfo}
                disabled={loading.editProductInfo || product.productVariants.length === 0}
              >
                Save & Active
              </LoadingButton>
            )}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
