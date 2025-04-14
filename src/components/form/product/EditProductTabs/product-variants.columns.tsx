import { ColumnDef, Row } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { CreateProductVariant, SelectedOption } from "@/redux/product/product.type";

export function getProductVariantsColumns(selectedOption: SelectedOption[]): ColumnDef<CreateProductVariant>[] {
  return [
    ...selectedOption.map((opt: SelectedOption, index: number) => ({
      id: opt.option,
      header: () => <span className="capitalize">{opt.option}</span>,
      cell: ({ row }: { row: Row<CreateProductVariant> }) => {
        const values = row.original.variantValues;
        console.log(values);
        return (
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded bg-muted text-sm border">{values[index].optionValue}</span>
          </div>
        );
      },
    })),
    {
      id: "price",
      header: "Price",
      cell: ({ row, getValue }) => {
        const value = getValue() as number;
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              row.original.price = +e.target.value;
            }}
          />
        );
      },
    },
    {
      id: "quantity",
      header: "Quantity",
      cell: ({ row, getValue }) => {
        const value = getValue() as number;
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => {
              row.original.quantity = +e.target.value;
            }}
          />
        );
      },
    },
    {
      id: "sku",
      header: "SKU",
      cell: ({ row, getValue }) => {
        const value = getValue() as string;
        return (
          <Input
            value={value}
            onChange={(e) => {
              row.original.sku = e.target.value;
            }}
          />
        );
      },
    },
  ];
}
