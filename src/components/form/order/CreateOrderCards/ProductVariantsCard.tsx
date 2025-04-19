import { FlexBox } from "@/components/FlexBox";
import { SelectObjectFormikField } from "@/components/formik-fields";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateOrderPayload } from "@/redux/order/order.type";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useProductTableFilters } from "@/components/form/product/ProductListTable/useProductTableFilters";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductState } from "@/redux/product/product.type";
import { getListProduct, getProduct } from "@/redux/product/product.thunk";
import { PRODUCT_STATUS, ProductVariant } from "@/types/product";
import { formatCurrencyVND } from "@/utils/string";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Image } from "@/components/Image";
import { TruncatedTextWithTooltip } from "@/components/TruncatedTextWithTooltip";

type SelectedVariantWithDetails = ProductVariant & {
  product: {
    id: string;
    name: string;
    thumbnail: string;
  };
};

export function ProductVariantsCard({ formikProps }: { formikProps: FormikProps<CreateOrderPayload> }) {
  const dispatch = useAppDispatch();
  const {
    loading,
    item: product,
    list: products,
    totalCount,
  } = useAppSelector<ProductState>((selector) => selector.product);
  const { filters, handleKeywordChange, handlePageChange } = useProductTableFilters();
  const { values, setFieldValue } = formikProps;

  useEffect(() => {
    (async () => {
      await dispatch(
        getListProduct({
          page: filters.page,
          limit: filters.limit,
          keyword: filters.keyword,
          status: PRODUCT_STATUS.ACTIVE,
        })
      ).unwrap();
    })();
  }, [filters]);

  useEffect(() => {
    if (values.selectedProductId) {
      (async () => {
        await dispatch(getProduct({ id: values.selectedProductId })).unwrap();
      })();
    }
  }, [values.selectedProductId]);

  const [matchingVariant, setMatchingVariant] = useState<ProductVariant | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariantWithDetails[]>([]);

  const handleRemoveVariant = (variantId: string) => {
    setSelectedVariants(selectedVariants.filter((v) => v.id !== variantId));
    setFieldValue(
      `productVariants`,
      values.productVariants.filter((item) => item.id !== variantId)
    );
  };

  const handleQuantityChange = (variantId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const variant = selectedVariants.find((v) => v.id === variantId);
    if (!variant) return;

    if (newQuantity > variant.quantity) return;

    const indexOrderItem = values.productVariants.findIndex((item) => item.id === variantId);

    setFieldValue(`productVariants[${indexOrderItem}].quantity`, newQuantity);
  };

  useEffect(() => {
    if (product) {
      // Only try to find a matching variant if all options are selected
      const allOptionsSelected = product.productOptions.every((option) => selectedOptions[option.option.name]);

      if (allOptionsSelected) {
        const variant = product.productVariants.find((variant) => {
          // Check if all selected options match this variant
          return Object.entries(selectedOptions).every(([optionName, optionValue]) =>
            variant.variantValues.find(
              (item) => item.option.name === optionName && item.optionValue.valueName === optionValue
            )
          );
        });

        setMatchingVariant(variant || null);
      } else {
        setMatchingVariant(null);
      }
    }
  }, [selectedOptions, product]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Variants</CardTitle>
        <CardDescription>Select products for this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <SelectObjectFormikField
              searchable
              switchable
              pagination
              searchValue={filters.keyword}
              loading={loading.getListProduct}
              onSearchChange={handleKeywordChange}
              name="selectedProductId"
              placeHolder="Choose a product"
              options={products.map((item) => ({ title: item.name, value: item.id }))}
              formikProps={formikProps}
              page={filters.page}
              limit={filters.limit}
              totalCount={totalCount}
              onPageChange={handlePageChange}
            />
          </div>

          {values.selectedProductId && product && (
            <>
              <FlexBox size="medium" direction="row">
                <div>
                  <Image width={32} src={product.thumbnail} alt={product.name} />
                </div>
                <div className="flex flex-col gap-2">
                  {product.productOptions.map((opt) => (
                    <div key={opt.option.id} className="text-sm flex flex-col gap-1">
                      <span className="block font-medium">{opt.option.name}</span>
                      <span className="flex items-center gap-2">
                        {opt.optionValues.map((value) => {
                          return (
                            <Badge
                              key={value.id}
                              onClick={() =>
                                setSelectedOptions((prev) => ({
                                  ...prev,
                                  ...{ [opt.option.name]: value.valueName },
                                }))
                              }
                              className="min-w-[32px] flex items-center justify-center cursor-pointer"
                              variant={
                                Object.entries(selectedOptions).some(
                                  ([optionName, optionValue]) =>
                                    optionName === opt.option.name && optionValue === value.valueName
                                )
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {value.valueName}
                            </Badge>
                          );
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </FlexBox>

              {matchingVariant && (
                <>
                  <div className="mt-4 p-3 border rounded-md bg-muted/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{product?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          SKU: {matchingVariant.sku} | Quantity: {matchingVariant.quantity}
                        </p>
                        <p className="text-sm">
                          Options:{" "}
                          {Object.entries(matchingVariant.variantValues)
                            .map(([_, value]) => `${value.option.name}: ${value.optionValue.valueName}`)
                            .join(", ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrencyVND(matchingVariant.price)}</p>
                      </div>
                    </div>
                    {matchingVariant.quantity === 0 && (
                      <Badge variant="destructive" className="text-white rounded px-1 text-[11px]">
                        Out of stock
                      </Badge>
                    )}
                  </div>

                  {matchingVariant.quantity > 0 && (
                    <div className="flex items-center justify-end">
                      <Button
                        onClick={() => {
                          const variantDetails = {
                            ...matchingVariant,
                            product: {
                              id: product.id,
                              name: product.name,
                              thumbnail: product.thumbnail,
                            },
                          };
                          const indexDuplicate = values.productVariants.findIndex(
                            (item) => item.id === matchingVariant.id
                          );
                          if (indexDuplicate === -1) {
                            setFieldValue("productVariants", [
                              ...values.productVariants,
                              { ...variantDetails, quantity: 1 },
                            ]);

                            setSelectedVariants((prev) => [...prev, variantDetails]);
                          } else {
                            handleQuantityChange(
                              values.productVariants[indexDuplicate].id,
                              ++values.productVariants[indexDuplicate].quantity
                            );
                          }
                        }}
                        disabled={(() => {
                          const indexDuplicate = values.productVariants.findIndex(
                            (item) => item.id === matchingVariant.id
                          );

                          return matchingVariant
                            ? matchingVariant.quantity === 0 ||
                                values.productVariants[indexDuplicate]?.quantity === matchingVariant.quantity
                            : false;
                        })()}
                        type="button"
                      >
                        Add to Order
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <Separator />

          {/* Selected Products List */}
          <div className="space-y-4">
            {values.productVariants.length > 0 ? (
              values.productVariants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex flex-col gap-3 md:flex-row md:items-center justify-between p-4 border rounded-md"
                >
                  <div className="flex items-center gap-3 flex-1 mb-3 md:mb-0">
                    <Avatar className="h-12 w-12 rounded-sm border">
                      {variant.product.thumbnail && (
                        <AvatarImage src={variant.product.thumbnail} alt={variant.product.name} />
                      )}
                      <AvatarFallback className="rounded-full capitalize">
                        {variant.product.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <TruncatedTextWithTooltip lineClamp={2} className="font-medium">
                        {variant.product.name}
                      </TruncatedTextWithTooltip>
                      <p className="text-sm text-muted-foreground">SKU: {variant.sku}</p>
                      <p className="text-sm text-muted-foreground">
                        {Object.entries(variant.variantValues)
                          .map(([_, value]) => `${value.option.name}: ${value.optionValue.valueName}`)
                          .join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(variant.id, variant.quantity - 1)}
                        disabled={variant.quantity <= 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center select-none">{variant.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(variant.id, variant.quantity + 1)}
                        disabled={
                          variant.quantity >= (selectedVariants.find((item) => item.id === variant.id)?.quantity || 1)
                        }
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right min-w-[120px]">
                        <p className="font-medium">{formatCurrencyVND(variant.price * variant.quantity)}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrencyVND(variant.price)} × {variant.quantity}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleRemoveVariant(variant.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 border rounded-md bg-muted/20">
                <p className="text-muted-foreground">No products added to this order</p>
                <p className="text-sm text-muted-foreground">Click "Add Product" to select products</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
