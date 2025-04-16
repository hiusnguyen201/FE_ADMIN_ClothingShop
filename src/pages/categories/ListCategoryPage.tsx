import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CategoryListTable } from "@/components/form/category/CategoryListTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCategoryDialogForm } from "@/components/form/category/CreateCategoryForm";

export function ListCategoryPage() {
  return (
    <ContentWrapper>
      <Heading
        title="Categories"
        description="View categories for your applications."
        actionRight={
          <CreateCategoryDialogForm>
            <Button>
              <Plus size={14} />
              Create Category
            </Button>
          </CreateCategoryDialogForm>
        }
      />

      <CategoryListTable />
    </ContentWrapper>
  );
}
