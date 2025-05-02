import * as Yup from "yup";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
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
import { FlexBox } from "@/components/FlexBox";
import { LoadingButton } from "@/components/LoadingButton";
import { TextEditorFormikField } from "@/components/formik-fields/TextEditorFormikField";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const initialValues: CreateProductPayload = {
  name: "",
  description: "",
  category: "",
  subCategory: null,
  thumbnail: null,
};

const createProductSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(50),
  description: Yup.string().required(),
  category: Yup.string().required(),
  subCategory: Yup.string().nullable().default(null),
  thumbnail: Yup.mixed<File>().required(),
});

export function CreateProductForm() {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<ProductState>((selector) => selector.product);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSubmit = async (values: CreateProductPayload, { resetForm }: FormikHelpers<CreateProductPayload>) => {
    try {
      const { data }: CreateProductResponse = await dispatch(createProduct(values)).unwrap();
      resetForm();
      toast({
        title: "Create product successful",
        action: (
          <Link to={`/products/${data.id}/settings`}>
            <Button size="sm" className="h-8 gap-1">
              <span>View Details</span>
            </Button>
          </Link>
        ),
      });
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

  const formik: FormikProps<CreateProductPayload> = useFormik({
    initialValues,
    validationSchema: createProductSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validate: checkUniqueName,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FlexBox>
      <FlexBox direction={isMobile ? "column" : "row"} className="justify-between">
        <ImageFormikField
          size={isMobile ? 120 : 212}
          name="thumbnail"
          label="Promotion Image"
          hintDirection={isMobile ? "right" : "bottom"}
          required
          formikProps={formik}
        />

        <FlexBox className="md:max-w-[600px]">
          <InputFormikField
            name="name"
            placeholder="Enter name..."
            type="text"
            label="Name"
            required
            formikProps={formik}
          />

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
        </FlexBox>
      </FlexBox>

      <TextEditorFormikField name="description" label="Description" required formikProps={formik} />

      <LoadingButton
        onClick={() => formik.handleSubmit()}
        loading={loading.createProduct}
        disabled={loading.createProduct}
        className="min-w-[120px]"
      >
        Add new
      </LoadingButton>
    </FlexBox>
  );
}
