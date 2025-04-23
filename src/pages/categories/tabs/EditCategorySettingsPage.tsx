import { FlexBox } from "@/components/FlexBox";
import { AlertBox } from "@/components/AlertBox";
import { EditCategoryInfoForm } from "@/components/form/category/EditCategoryTabs/EditCategoryInfoForm";
import { RemoveCategoryDialogForm } from "@/components/form/category/RemoveCategoryDialogForm";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";

export function EditCategorySettingsPage({
  category,
  canEdit,
  canRemove,
}: {
  category: Category;
  canEdit: boolean;
  canRemove: boolean;
}) {
  return (
    <FlexBox size="large">
      {/* Edit Form */}
      {canEdit && <EditCategoryInfoForm category={category} />}

      {canRemove && (
        <FlexBox size="small">
          <h2 className="text-lg font-medium">Danger Zone</h2>

          <AlertBox
            title="Remove Category"
            description="Once confirmed, this operation can't be undone!"
            rightAction={
              <RemoveCategoryDialogForm
                category={category}
                finishNavigate={category.level === 1 ? "/categories" : `/categories/${category.parent}/subcategories`}
              >
                <Button variant="destructive" className="capitalize rounded text-white">
                  Remove
                </Button>
              </RemoveCategoryDialogForm>
            }
          />
        </FlexBox>
      )}
    </FlexBox>
  );
}
