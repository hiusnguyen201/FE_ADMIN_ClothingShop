import { FlexBox } from "@/components/FlexBox";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Category } from "@/types/category";
import { CreateCategoryDialogForm } from "@/components/form/category/CreateCategoryForm";
import { SubcategoryListTable } from "@/components/form/category/EditCategoryTabs/SubcategoryListTable";
import { subcategoriesColumns } from "./subcategories-columns";

export function EditSubcategoriesPage({ category }: { category: Category }) {
  return (
    <FlexBox>
      <Heading
        description="Add subcategory to this category."
        actionRight={
          <CreateCategoryDialogForm parent={category}>
            <Button>
              <Plus size={14} />
              Add subcategory
            </Button>
          </CreateCategoryDialogForm>
        }
      />

      <SubcategoryListTable category={category} columns={subcategoriesColumns} />
    </FlexBox>
  );
}
