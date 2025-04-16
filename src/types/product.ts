import { Option, OptionValue } from "@/types/option";
import { Category } from "@/types/category";
import { Nullable } from "@/types/common";

export enum PRODUCT_STATUS {
  INACTIVE = "inactive",
  ACTIVE = "active",
  DRAFT = "draft",
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

export type ProductVariant = {
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
  category: Category;
  subCategory: Nullable<Category>;
  productOptions: ProductOption[];
  productVariants: ProductVariant[];
};
