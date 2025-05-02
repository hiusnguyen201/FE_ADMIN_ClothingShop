import { FlexBox } from "@/components/FlexBox";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Category } from "@/types/category";
import { CreateCategoryDialogForm } from "@/components/form/category/CreateCategoryDialogForm";
import { SubcategoryListTable } from "@/components/form/category/EditCategoryTabs/SubcategoryListTable";

export function EditSubcategoriesPage({
  category,
  canCreate,
  canReadList,
}: {
  category: Category;
  canCreate: boolean;
  canReadList: boolean;
}) {
  return (
    <FlexBox>
      <Heading
        description="Add subcategory to this category."
        actionRight={
          canCreate && (
            <CreateCategoryDialogForm parent={category}>
              <Button>
                <Plus size={14} />
                Add subcategory
              </Button>
            </CreateCategoryDialogForm>
          )
        }
      />

      {canReadList && <SubcategoryListTable category={category} />}
    </FlexBox>
  );
}
