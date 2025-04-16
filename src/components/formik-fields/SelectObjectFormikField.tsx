import { FormikProps } from "formik";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { SearchFormField } from "../form-fields/SearchFormFIeld";

export type OptionItem = {
  value: string | number;
  title: string;
};

export type SelectObjectFormikFieldProps<TData extends Record<string, any>> = {
  name: string;
  switchable?: boolean;
  label?: string;
  required?: boolean;
  options: OptionItem[];
  className?: string;
  placeHolder?: string;
  formikProps: FormikProps<TData>;
  open?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onOpenChange?: (value: boolean) => void;
  searchable?: boolean;
  description?: string;
  onSearchClick?: (value: string) => void;
  searchValue?: string;
  onSelectChange?: (value: string | null) => void;
};

export function SelectObjectFormikField<TData extends Record<string, any>>({
  name,
  switchable = false,
  label,
  loading,
  required = false,
  className,
  options,
  onOpenChange,
  placeHolder,
  formikProps,
  disabled = false,
  open,
  searchable = false,
  description,
  onSearchClick,
  onSelectChange,
  searchValue,
}: SelectObjectFormikFieldProps<TData>) {
  const { errors, setFieldValue, values, validateField, isSubmitting } = formikProps;

  const currentValue: string = values[name] as string;
  const error: string = errors[name] as string;

  return (
    <div className={cn("w-full h-full", isSubmitting && "opacity-50", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block items-center", error && "text-red-500")}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <div className="flex font-normal bg-transparent text-base md:text-sm w-full gap-5 h-full">
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger
            asChild
            disabled={isSubmitting || disabled}
            className={cn(
              "text-start flex items-center justify-between w-full border py-[9px] px-4 rounded bg-white",
              disabled && "opacity-60",
              error && "border-red-500 focus:border-red-500"
            )}
          >
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {options.find((item) => item.value === currentValue)?.title ?? (placeHolder || `Select ${label || name}`)}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          {!loading && (
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
              <Command className="max-h-[312px]">
                {searchable && (
                  <SearchFormField
                    className="focus-within:ring-0 rounded-none border-b border-t-0 border-x-0"
                    name={name}
                    value={searchValue}
                    onSearchClick={onSearchClick}
                    placeholder={placeHolder}
                  />
                )}

                <CommandList>
                  <CommandEmpty>No select options.</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => {
                      const isSelected = currentValue === opt.value;
                      return (
                        <CommandItem
                          key={opt.value}
                          value={opt.value.toString()}
                          onSelect={() => {
                            if (!switchable && currentValue === opt.value) return;
                            const val = currentValue === opt.value ? null : opt.value;
                            setFieldValue(name, val);
                            onSelectChange?.(val ? val.toString() : null);
                          }}
                          className="cursor-pointer"
                        >
                          <span>{opt.title}</span>
                          {isSelected && <Check className="ml-auto h-4 w-4" />}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  {description && <CommandGroup className="py-[6px] px-2 text-sm">{description}</CommandGroup>}
                </CommandList>
              </Command>
            </PopoverContent>
          )}
        </Popover>
      </div>

      {error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}
    </div>
  );
}

// 'button' |
//   'checkbox' |
//   'color' |
//   'date' |
//   'datetime-local' |
//   'email' |
//   'file' |
//   'hidden' |
//   'image' |
//   'month' |
//   'number' |
//   'password' |
//   'radio' |
//   'range' |
//   'reset' |
//   'search' |
//   'submit' |
//   'tel' |
//   'text' |
//   'time' |
//   'url' |
//   'week';
