import { FormikProps } from "formik";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { Spinner } from "@/components/spinner";
import { CommandPagination } from "@/components/CommandPagination";
import { useEffect, useMemo, useState } from "react";
import { normalizeVietnamese } from "@/utils/string";

export type OptionItem = {
  value: string | number;
  title: string;
};

export type SelectObjectFormikFieldProps<TData extends Record<string, any>> = {
  editing?: boolean;
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
  searchValue?: string;
  onSelectChange?: (value: string | null) => void;
  onSearchChange?: (value: string) => void;
  pagination?: boolean;
  onPageChange?: (page: number) => void;
  page?: number;
  totalPages?: number;
  limit?: number;
  totalCount?: number;
  searchInForm?: boolean;
};

export function SelectObjectFormikField<TData extends Record<string, any>>({
  editing = true,
  name,
  switchable = false,
  label,
  loading = false,
  required = false,
  className,
  options,
  onOpenChange,
  placeHolder,
  formikProps,
  disabled = false,
  open,
  searchable = false,
  onSelectChange,
  onSearchChange,
  searchValue,
  pagination,
  onPageChange,
  page,
  limit,
  totalCount,
  searchInForm,
}: SelectObjectFormikFieldProps<TData>) {
  const isControlled = typeof open === "boolean" && typeof onOpenChange === "function";

  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const dialogOpen = isControlled ? open! : internalOpen;

  const { errors, setFieldValue, values, validateField, setFieldError, isSubmitting, setFieldTouched, touched } =
    formikProps;

  const currentValue: string = values[name] as string;
  const error: string = errors[name] as string;

  const setDialogOpen = async (open: boolean) => {
    if (open) {
      setFieldError(name, undefined);
    }

    if (isControlled) {
      onOpenChange!(open);
    } else {
      setInternalOpen(open);
    }
  };

  useEffect(() => {
    if (touched[name]) {
      validateField(name);
    }
  }, [currentValue]);

  const [searchInFormValue, setSearchInFormValue] = useState<string>("");

  const filterOptions = useMemo(() => {
    return searchInForm
      ? options.filter((item) => {
          return normalizeVietnamese(item.title).includes(normalizeVietnamese(searchInFormValue));
        })
      : options;
  }, [options, searchInFormValue]);

  return (
    <div className={cn("w-full", isSubmitting && "opacity-50", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block items-center", editing && error && "text-red-500")}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <div className="flex font-normal bg-transparent text-base md:text-sm w-full gap-5">
        <Popover open={dialogOpen} onOpenChange={setDialogOpen}>
          <PopoverTrigger
            asChild
            disabled={isSubmitting || disabled}
            className={cn(
              "text-start flex items-center justify-between w-full border py-[9px] px-4 rounded bg-white",
              disabled && "opacity-60",
              editing && error && "border-red-500 focus:border-red-500"
            )}
          >
            <Button
              disabled={isSubmitting || disabled || !editing}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", !editing && "!cursor-default !opacity-100 bg-gray-100")}
            >
              {options.find((item) => item.value === currentValue)?.title ?? (placeHolder || `Select ${label || name}`)}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          {editing && (
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
              <Command className="max-h-[312px]">
                {searchable && (
                  <SearchFormField
                    className="focus-within:ring-0 rounded-none border-b border-t-0 border-x-0"
                    name={name}
                    type="change"
                    value={searchInForm ? searchInFormValue : searchValue ?? ""}
                    onValueChange={(value) => {
                      onSearchChange?.(value);
                      if (searchInForm) {
                        setSearchInFormValue(value);
                      }
                    }}
                    placeholder={placeHolder}
                  />
                )}

                <CommandList>
                  <CommandEmpty>{loading ? <Spinner /> : <span>No select options.</span>}</CommandEmpty>
                  {!loading && (
                    <CommandGroup>
                      {filterOptions.map((opt) => {
                        const isSelected = currentValue === opt.value;
                        return (
                          <CommandItem
                            key={opt.value}
                            value={opt.value.toString()}
                            onSelect={() => {
                              if (!switchable && currentValue === opt.value) return;
                              const val = currentValue === opt.value ? null : opt.value;
                              setFieldValue(name, val);
                              setFieldTouched(name);
                              onSelectChange?.(val ? val.toString() : null);
                              if (val) {
                                setDialogOpen(false);
                              }
                            }}
                            className="cursor-pointer"
                          >
                            <span>{opt.title}</span>
                            {isSelected && <Check className="ml-auto h-4 w-4" />}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  )}
                </CommandList>
                {pagination && (
                  <CommandPagination
                    page={page ?? 1}
                    totalPages={Math.max(1, Math.ceil((totalCount ?? 0) / (limit ?? 10)))}
                    onPageChange={(page) => {
                      onPageChange?.(page);
                    }}
                  />
                )}
              </Command>
            </PopoverContent>
          )}
        </Popover>
      </div>

      {editing && error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}
    </div>
  );
}
