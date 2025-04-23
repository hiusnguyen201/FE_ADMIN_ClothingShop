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
import { EditProductSettingsPage, EditProductVariantsPage } from "@/pages/products/tabs";
import { ProductGuardChildrenProps } from "@/guards/product/ProductExistsGuard";
import { BoxStatusMessage } from "@/components/BoxStatusMessage";
import { PRODUCT_STATUS } from "@/types/product";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/use-permission";

enum TABS {
  SETTINGS = "settings",
  VARIANTS = "variants",
}

const productStatusMessage: Record<PRODUCT_STATUS, any> = {
  [PRODUCT_STATUS.ACTIVE]: {
    status: "success",
    title: "Active",
    description: "This product is currently active and available for purchase.",
  },
  [PRODUCT_STATUS.INACTIVE]: {
    status: "error",
    title: "Deactivate",
    description: "This product has been deactivated and is not available for purchase.",
  },
  [PRODUCT_STATUS.DRAFT]: {
    status: "warning",
    title: "Draft",
    description: "This product is in draft mode and not visible to customers.",
  },
};

const tabs = [
  {
    value: TABS.SETTINGS,
    element: EditProductSettingsPage,
  },
  {
    value: TABS.VARIANTS,
    element: EditProductVariantsPage,
  },
];

export function DetailsProductPage({ product, checkExistLoading }: ProductGuardChildrenProps) {
  const can = usePermission();
  if (!can(PERMISSIONS.READ_DETAILS_PRODUCT)) return <Navigate to={"/forbidden"} />;

  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    const path = location.pathname.split("/").pop();
    if (Object.values(TABS).includes(path as TABS)) {
      return path as TABS;
    }
    return TABS.SETTINGS;
  }, [location]);

  return (
    <ContentWrapper>
      <FlexBox size="large">
        <FlexBox>
          {product && (
            <BoxStatusMessage
              status={productStatusMessage[product.status].status}
              title={productStatusMessage[product.status].title}
              description={productStatusMessage[product.status].description}
            />
          )}

          <Link to={"/products"} className="flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            <span>Back to Products</span>
          </Link>
          {checkExistLoading && (
            <div className="flex items-center justify-center w-full">
              <Spinner />
            </div>
          )}
          {!checkExistLoading && (
            <Heading
              title={product?.name || "Product"}
              description={
                <div className="flex items-center gap-1">
                  <span>Product ID</span>
                  <Tag>{product?.id || 1}</Tag>
                </div>
              }
            />
          )}
        </FlexBox>

        {!checkExistLoading && product && (
          <FlexBox size="large">
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                navigate(`/products/${product.id}/${val}`);
              }}
              className="flex flex-col gap-6 w-full"
            >
              <TabsList className="bg-[transparent] gap-6 border-b w-full justify-start rounded-none h-auto p-0">
                {tabs.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="relative capitalize transition-all py-3 px-1 data-[state=active]:bg-[transparent] hover:text-primary data-[state=active]:text-primary border-0 data-[state=active]:shadow-none rounded-none"
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
                      product,
                      canEdit: can(PERMISSIONS.EDIT_PRODUCT_INFO),
                      canRemove: can(PERMISSIONS.REMOVE_PRODUCT),
                      canEditVariants: can(PERMISSIONS.EDIT_PRODUCT_VARIANTS),
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
