import { CreateProductVariant, CreateProductVariantValue, SelectedOption } from "@/redux/product/product.type";

export function generateVariantsFromSelectedOptions(selectedOptions: SelectedOption[]): CreateProductVariant[] {
  const newVariants: CreateProductVariant[] = [];
  if (selectedOptions.length === 0) return newVariants;

  const backtrack = (depth = 0, current: CreateProductVariantValue[] = []) => {
    if (depth === selectedOptions.length) {
      newVariants.push({
        quantity: 0,
        price: 0,
        sku: "",
        variantValues: [...current],
      });
      return;
    }

    const currentOption = selectedOptions[depth];

    currentOption.selectedValues.forEach((value) => {
      backtrack(depth + 1, [
        ...current,
        {
          option: currentOption.option,
          optionValue: value,
        },
      ]);
    });
  };

  backtrack();

  return newVariants;
}
