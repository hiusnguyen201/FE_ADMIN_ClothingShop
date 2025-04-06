import { Nullable } from "@/types/common";

export type Category = {
  id: string;
  image: string;
  name: string;
  slug: string;
  level: number;
  parent: Nullable<string>;
  children: Category[];
};
