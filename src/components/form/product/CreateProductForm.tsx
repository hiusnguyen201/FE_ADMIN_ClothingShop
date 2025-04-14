import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { InputFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { checkProductNameExist, createProduct } from "@/redux/product/product.thunk";
import { CheckProductNameExistResponse, CreateProductPayload, ProductState } from "@/redux/product/product.type";
import { ImageFormikField } from "@/components/formik-fields/ImageFormikField";
import { OptionState } from "@/redux/option/option.type";
import { getListOption } from "@/redux/option/option.thunk";
import { Option } from "@/types/option";

const initialValues: CreateProductPayload = {
  thumbnail: null,
  name: "",
  description: "",
  category: "",
  subCategory: null,
};

const variantValueSchema = Yup.object().shape({
  option: Yup.string().required(),
  optionValue: Yup.string().required(),
});

const productVariantSchema = Yup.object().shape({
  quantity: Yup.number().required().min(0),
  price: Yup.number().required().min(1000),
  sku: Yup.string().required().min(8).max(16),
  variantValues: Yup.array(variantValueSchema).required(),
});

const optionsSchema = Yup.object().shape({
  id: Yup.string().required(),
  values: Yup.array(Yup.string().required()).required(),
});

const createProductSchema = Yup.object().shape({
  name: Yup.string().required().min(3).max(100),
  thumbnail: Yup.mixed<File>().required(),
  price: Yup.number().required().min(1000),
  description: Yup.string().required().min(30).max(3000),
  category: Yup.string().required(),
  subCategory: Yup.string().nullable().default(null),
  options: Yup.array(optionsSchema).required().min(1, "At least one option is required"),
  productVariants: Yup.array(productVariantSchema).required(),
});

export type ChildrenCreateProductFormProps = {
  values: CreateProductPayload;
  selectOptions: Option[];
  renderInputFieldName: () => ReactNode;
  renderInputFieldDescription: () => ReactNode;
  renderInputFieldThumbnail: () => ReactNode;
  renderSelectFieldOption: () => ReactNode;
};

type CreateProductFormProps = {
  children: (props: ChildrenCreateProductFormProps) => ReactNode;
  open?: false;
  onOpenChange?: (value: boolean) => void;
};

export function CreateProductForm({ children }: CreateProductFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading: loadingProduct } = useAppSelector<ProductState>((selector) => selector.product);
  const { loading: loadingOption, list: options } = useAppSelector<OptionState>((selector) => selector.option);

  const handleSubmit = async (values: CreateProductPayload, { resetForm }: FormikHelpers<CreateProductPayload>) => {
    try {
      await dispatch(createProduct(values)).unwrap();
      resetForm();
      toast({ title: "Add new product successful" });
      navigate(`/products`);
    } catch (error: any) {
      toast({ variant: "destructive", title: error });
    }
  };

  const validateProductName = async (values: CreateProductPayload) => {
    const errors: { [key: string]: string } = {};

    const response: CheckProductNameExistResponse = await dispatch(
      checkProductNameExist({ name: values.name })
    ).unwrap();
    if (response.data) {
      errors.name = "name already exists";
    }

    return errors;
  };

  useEffect(() => {
    (async () => {
      await dispatch(getListOption());
    })();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: createProductSchema,
    validate: validateProductName,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {children({
        values: formik.values,
        selectOptions: options,
        renderInputFieldName: () => (
          <InputFormikField name="name" type="text" label="Name" required formikProps={formik} />
        ),
        renderInputFieldThumbnail: () => (
          <ImageFormikField size={120} name="thumbnail" label="Thumbnail" required formikProps={formik} />
        ),
        renderInputFieldDescription: () => (
          <InputFormikField name="description" type="textarea" label="Description" required formikProps={formik} />
        ),
        renderSelectFieldOption: () => <></>,
      })}
    </form>
  );
}
