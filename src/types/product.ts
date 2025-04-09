import { Option, OptionValue } from "@/types/option";

type VariantValue = {
  id: string;
  option: Option;
  value: OptionValue;
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
  productVariants: string[];
};
