import { Image } from "@/components/Image";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTopProductVariants } from "@/redux/report/report.thunk";
import { ReportState } from "@/redux/report/report.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PRODUCT_STATUS } from "@/types/product";
import { formatCurrencyVND } from "@/utils/string";
import { MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function ProductVariantTable() {
  const dispatch = useAppDispatch();
  const { loading, topProductVariants } = useAppSelector<ReportState>((selector) => selector.report);

  useEffect(() => {
    (async () => {
      await dispatch(getTopProductVariants()).unwrap();
    })();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Sales</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topProductVariants.map((variant) => (
          <TableRow key={variant.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Image src={variant.product.thumbnail} alt={variant.product.name} aspect="3/4" />
                <div>
                  <div className="font-medium">
                    <Link to={"/products/" + variant.product.id + "/settings"} className="text-blue-500">
                      {variant.product.name}
                    </Link>
                  </div>
                  <div className="text-xs text-muted-foreground">SKU: {variant.sku}</div>
                  <div className="text-xs text-muted-foreground">
                    Variation: {variant.variantValues.map((value) => value.optionValue.valueName).join(", ")}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <Link
                  className="font-medium text-blue-500"
                  to={"/categories/" + variant.product.category.id + "/settings"}
                >
                  {variant.product.category.name}
                </Link>
                {variant.product.subCategory && <span className="text-xs">{variant.product.subCategory.name}</span>}
              </div>
            </TableCell>
            <TableCell>{formatCurrencyVND(variant.price)}</TableCell>
            <TableCell>{variant.quantity}</TableCell>
            <TableCell>{variant.sold}</TableCell>
            <TableCell>
              <Badge
                className="capitalize"
                variant={variant.product.status === PRODUCT_STATUS.INACTIVE ? "outline" : "default"}
              >
                {variant.product.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
