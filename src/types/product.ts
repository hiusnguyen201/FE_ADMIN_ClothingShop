import { Option, OptionValue } from "@/types/option";

export type VariantValue = {
  id: string;
  option: Option;
  value: OptionValue;
};

type SelectedOption = {
  id: string;
  name: string;
  selectedValues: OptionValue[];
};

type ProductVariant = {
  id: string;
  quantity: number;
  price: number;
  sku: string;
  variantValues: VariantValue[];
};

export enum PRODUCT_STATUS {
  INACTIVE = "inactive",
  ACTIVE = "active",
}

export type Product = {
  id: string;
  thumbnail: string;
  name: string;
  description: string;
  status: PRODUCT_STATUS;
  category: string;
  subCategory?: string;
  options: SelectedOption[];
  productVariants: ProductVariant[];
};
