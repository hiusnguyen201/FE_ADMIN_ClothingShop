import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { CategoryListTable } from "@/components/form/category/CategoryListTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCategoryDialogForm } from "@/components/form/category/CreateCategoryForm";
import { usePermission } from "@/hooks/use-permission";
import { PERMISSIONS } from "@/constants/permissions";

export function ListCategoryPage() {
  const can = usePermission();

  return (
    <ContentWrapper>
      <Heading
        title="Categories"
        description="View categories for your applications."
        actionRight={
          can(PERMISSIONS.CREATE_CATEGORY) && (
            <CreateCategoryDialogForm>
              <Button>
                <Plus size={14} />
                Create Category
              </Button>
            </CreateCategoryDialogForm>
          )
        }
      />
      {can(PERMISSIONS.READ_CATEGORIES) && <CategoryListTable />}
    </ContentWrapper>
  );
}
