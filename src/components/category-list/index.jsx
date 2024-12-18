import { CategoryItem } from "@/components/category-list/category-item";

export const CategoryList = () => {
  return (
    <section className="px-2 sm:px-4 md:px-10 my-12">
      <div className="-mx-2 grid lg:grid-cols-4 grid-cols-2">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
    </section>
  );
};
