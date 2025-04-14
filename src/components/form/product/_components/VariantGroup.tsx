import { cn } from "@/lib/utils";
import { OptionGroup } from "./OptionGroup";

export function VariantGroup({
  selectedValues,
  options,
  onSelectedValuesChange,
  className,
}: {
  selectedValues: string[];
  options: { id: string; value: string }[];
  onSelectedValuesChange: (selectedValues: string[]) => void;
  className?: string;
}) {
  return (
    <OptionGroup
      className={cn("flex-1", className)}
      option={{
        id: "variants",
        name: "Variants",
        optionValues: options.map((opt) => ({ id: opt.id, valueName: opt.value })),
      }}
      selectedValues={selectedValues}
      onSelectionChange={onSelectedValuesChange}
    />
  );
}
