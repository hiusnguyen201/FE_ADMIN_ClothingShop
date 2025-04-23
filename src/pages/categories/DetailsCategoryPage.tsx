import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { Heading } from "@/components/Heading";
import { Tag } from "@/components/Tag";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { FlexBox } from "@/components/FlexBox";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Spinner } from "@/components/spinner";
import { EditCategorySettingsPage } from "@/pages/categories/tabs";
import { CategoryGuardChildrenProps } from "@/guards/category/CategoryExistsGuard";
import { EditSubcategoriesPage } from "@/pages/categories/tabs/EditSubcategoriesPage";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";

enum TABS {
  SETTINGS = "settings",
  SUBCATEGORIES = "subcategories",
}

export function DetailsCategoryPage({ category, checkExistLoading }: CategoryGuardChildrenProps) {
  const can = usePermission();
  if (!can(PERMISSIONS.READ_DETAILS_CATEGORY)) return <Navigate to={"/forbidden"} />;

  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    const path = location.pathname.split("/").pop();
    if (Object.values(TABS).includes(path as TABS)) {
      return path as TABS;
    }
    return TABS.SETTINGS;
  }, [location]);

  const tabs =
    category?.level === 1
      ? [
          {
            value: TABS.SETTINGS,
            element: EditCategorySettingsPage,
          },
          { value: TABS.SUBCATEGORIES, element: EditSubcategoriesPage },
        ]
      : [
          {
            value: TABS.SETTINGS,
            element: EditCategorySettingsPage,
          },
        ];

  return (
    <ContentWrapper>
      <FlexBox size="large">
        <FlexBox>
          {category?.level === 1 ? (
            <Link to={"/categories"} className="flex items-center gap-2 text-sm">
              <ArrowLeft size={16} />
              <span>Back to Categories</span>
            </Link>
          ) : (
            <Link to={`/categories/${category?.parent}/subcategories`} className="flex items-center gap-2 text-sm">
              <ArrowLeft size={16} />
              <span>Back to Subcategories</span>
            </Link>
          )}

          {checkExistLoading && (
            <div className="flex items-center justify-center w-full">
              <Spinner />
            </div>
          )}

          {!checkExistLoading && (
            <Heading
              title={category?.name || "Category"}
              description={
                <div className="flex items-center gap-1">
                  <span>Category ID</span>
                  <Tag>{category?.id || 1}</Tag>
                </div>
              }
            />
          )}
        </FlexBox>

        {!checkExistLoading && category && (
          <FlexBox size="large">
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                navigate(`/categories/${category.id}/${val}`);
              }}
              className="flex flex-col gap-6 w-full"
            >
              <TabsList className="bg-[transparent] gap-6 border-b w-full justify-start rounded-none h-auto p-0">
                {tabs.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="relative capitalize transition-all py-3 px-1 data-[state=active]:bg-[transparent] hover:text-primary data-[state=active]:text-primary border-0 data-[state=active]:shadow-none rounded-none "
                  >
                    {item.value}
                    {activeTab === item.value && (
                      <div className="absolute h-[2px] bg-primary w-full inset-x-0 bottom-0"></div>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div>
                {tabs.map((item) => (
                  <TabsContent key={item.value} value={item.value} className="py-4 mt-0">
                    {item.element({
                      category,
                      canEdit: can(PERMISSIONS.EDIT_CATEGORY),
                      canRemove: can(PERMISSIONS.REMOVE_CATEGORY),
                      canCreate: can(PERMISSIONS.CREATE_CATEGORY),
                      canReadList: can(PERMISSIONS.READ_CATEGORIES),
                    })}
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </FlexBox>
        )}
      </FlexBox>
    </ContentWrapper>
  );
}
