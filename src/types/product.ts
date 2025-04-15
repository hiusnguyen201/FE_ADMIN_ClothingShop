import { Option, OptionValue } from "@/types/option";

export enum PRODUCT_STATUS {
  INACTIVE = "inactive",
  ACTIVE = "active",
}

export type VariantValue = {
  id: string;
  option: Option;
  optionValue: OptionValue;
};

type ProductOption = {
  option: Option;
  optionValues: OptionValue[];
};

type ProductVariant = {
  id: string;
  quantity: number;
  price: number;
  sku: string;
  variantValues: VariantValue[];
};

export type Product = {
  id: string;
  thumbnail: string;
  name: string;
  description: string;
  status: PRODUCT_STATUS;
  category: string;
  subCategory?: string;
  productOptions: ProductOption[];
  productVariants: ProductVariant[];
};
