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
import { TextEditorFormikField } from "@/components/formik-fields/TextEditorFormikField";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Heading } from "@/components/Heading";

const editProductInfoSchema = Yup.object().shape({
  thumbnail: Yup.mixed<File>().required(),
  name: Yup.string().required().min(3).max(50),
  description: Yup.string().required(),
  category: Yup.string().required(),
  subCategory: Yup.string().nullable().default(null),
  status: Yup.string().oneOf(Object.values(PRODUCT_STATUS)).required(),
});

export function EditProductInfoForm({ product, canEdit }: { product: Product; canEdit: boolean }) {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<ProductState>((selector) => selector.product);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<boolean>(false);

  const handleToggleEditing = () => {
    setEditing(!editing);
  };

  const initialValues: EditProductInfoPayload = {
    id: product.id,
    thumbnail: product.thumbnail,
    name: product.name,
    description: product.description,
    category: product.category.id,
    subCategory: product.subCategory?.id,
    status: product.status,
  };

  const handleSubmit = async (values: EditProductInfoPayload, { resetForm }: FormikHelpers<EditProductInfoPayload>) => {
    if (!canEdit) return;
    try {
      await dispatch(editProductInfo(values)).unwrap();
      resetForm();
      toast({ title: "Edit product successful" });
      setEditing(false);
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
    if (!canEdit) return;
    (async () => {
      const response = await dispatch(getListCategory({ page: 1, limit: 100 })).unwrap();
      setCategories(response.data.list);
    })();
  }, []);

  return (
    <FlexBox size="large">
      <Heading
        level={2}
        title="Product Information"
        description="Enter basic information."
        actionRight={
          canEdit &&
          !editing && (
            <Button onClick={handleToggleEditing} type="button">
              <Pen /> Edit
            </Button>
          )
        }
      />

      <FlexBox size="large" onSubmit={formik.handleSubmit} component={editing && canEdit ? "form" : "div"}>
        <FlexBox direction={isMobile ? "column" : "row"} className="justify-between" size="large">
          <ImageFormikField
            editing={editing && canEdit}
            hintDirection={isMobile ? "right" : "bottom"}
            size={isMobile ? 120 : 212}
            name="thumbnail"
            label="Promotion Image"
            required
            formikProps={formik}
          />

          <FlexBox className="md:md:max-w-[600px]">
            <InputFormikField
              editing={editing && canEdit}
              name="name"
              type="text"
              label="Name"
              required
              formikProps={formik}
            />

            <SelectObjectFormikField
              editing={editing && canEdit}
              label="Category"
              name="category"
              options={categories.map((item) => ({ value: item.id, title: item.name }))}
              required
              formikProps={formik}
            />

            <SelectObjectFormikField
              editing={editing && canEdit}
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

        <TextEditorFormikField
          editing={editing && canEdit}
          label="Description"
          name="description"
          required
          formikProps={formik}
        />

        {canEdit && editing && (
          <div className="flex w-full sm:flex-row flex-col items-center gap-3">
            <LoadingButton
              onClick={handleToggleEditing}
              variant="outline"
              type="button"
              disabled={loading.editProductInfo}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              onClick={() => {
                formik.setFieldValue("status", PRODUCT_STATUS.INACTIVE);
              }}
              loading={loading.editProductInfo && formik.values.status === PRODUCT_STATUS.INACTIVE}
              disabled={loading.editProductInfo}
            >
              Save & Inactive
            </LoadingButton>
            {product.productVariants.length > 0 && (
              <LoadingButton
                onClick={() => {
                  formik.setFieldValue("status", PRODUCT_STATUS.ACTIVE);
                }}
                loading={loading.editProductInfo && formik.values.status === PRODUCT_STATUS.ACTIVE}
                disabled={loading.editProductInfo || product.productVariants.length === 0}
              >
                Save & Active
              </LoadingButton>
            )}
          </div>
        )}
      </FlexBox>
    </FlexBox>
  );
}
