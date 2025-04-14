import { CellContext, ColumnDef, Row } from "@tanstack/react-table";
import { CreateProductVariant, SelectedOption } from "@/redux/product/product.type";
import * as Yup from "yup";
import { useState } from "react";
import { InputFormField } from "@/components/form-fields/InputFormField";

const priceSchema = Yup.number().required().min(1000).max(100000000);
const quantitySchema = Yup.number().required().min(0).max(10000000);
const skuSchema = Yup.string().optional().min(8).max(16);

export function getProductVariantsColumns({
  selectedOption,
  onProductVariantsChange,
}: {
  selectedOption: SelectedOption[];
  onProductVariantsChange: (index: number, key: string, value: any) => void;
}): ColumnDef<CreateProductVariant>[] {
  return [
    ...selectedOption.map((opt: SelectedOption, index: number) => ({
      id: opt.option,
      header: () => <span className="capitalize">{opt.option}</span>,
      cell: ({ row }: { row: Row<CreateProductVariant> }) => {
        const values = row.original.variantValues;
        if (!values) return <></>;
        return (
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded bg-muted text-sm border">{values[index]?.optionValue}</span>
          </div>
        );
      },
    })),
    {
      id: "price",
      header: "Price",
      cell: ({ row }: CellContext<CreateProductVariant, unknown>) => {
        const [error, setError] = useState("");
        return (
          <InputFormField
            type="number"
            name="price"
            value={row.original.price}
            onValueChange={(value) => {
              setError("");
              onProductVariantsChange(row.index, "price", +value);
            }}
            error={error}
            onBlur={(e) => {
              try {
                priceSchema.validateSync(e.target.value);
              } catch (error: any) {
                setError(error.message);
              }
            }}
            min={0}
          />
        );
      },
    },
    {
      id: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const [error, setError] = useState("");
        return (
          <InputFormField
            type="number"
            name="quantity"
            value={row.original.quantity}
            onValueChange={(value) => {
              setError("");
              onProductVariantsChange(row.index, "quantity", +value);
            }}
            error={error}
            onBlur={(e) => {
              try {
                quantitySchema.validateSync(e.target.value);
              } catch (error: any) {
                setError(error.message);
              }
            }}
            min={0}
          />
        );
      },
    },
    {
      id: "sku",
      header: "SKU",
      cell: ({ row }) => {
        const [error, setError] = useState("");
        return (
          <InputFormField
            type="text"
            name="sku"
            value={row.original.sku}
            onValueChange={(value) => {
              setError("");
              onProductVariantsChange(row.index, "sku", value);
            }}
            error={error}
            onBlur={(e) => {
              try {
                if (!e.target.value) return;
                skuSchema.validateSync(e.target.value);
              } catch (error: any) {
                setError(error.message);
              }
            }}
          />
        );
      },
    },
  ];
}
