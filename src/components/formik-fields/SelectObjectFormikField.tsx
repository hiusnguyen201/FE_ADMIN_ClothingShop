import { FormikProps } from "formik";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/spinner";

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
  onOpenChange?: (value: boolean) => void;
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
  open,
}: SelectObjectFormikFieldProps<TData>) {
  const { errors, setFieldValue, values, validateField, isSubmitting } = formikProps;

  const currentValue: string = values[name] as string;
  const error: string = errors[name] as string;

  return (
    <div className={cn("w-full", isSubmitting && "opacity-50", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block items-center", error && "text-red-500")}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <div className="flex font-normal bg-transparent text-base md:text-sm w-full gap-5">
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
          <DropdownMenuTrigger
            disabled={isSubmitting}
            className={cn(
              "text-start flex items-center justify-between w-full border py-[9px] px-4 rounded bg-white",
              error && "border-red-500 focus:border-red-500"
            )}
          >
            {loading ? (
              <span className="block w-full">
                <Spinner size="small" />
              </span>
            ) : (
              <span className={cn("capitalize font-normal text-sm pr-1")}>
                {options.find((item) => item.value === currentValue)?.title ??
                  (placeHolder || `Select a ${label || name}`)}
              </span>
            )}
            <ChevronDown width={20} height={20} />
          </DropdownMenuTrigger>
          {!loading && (
            <DropdownMenuContent align="start" className="w-[var(--radix-popper-anchor-width)] select-none">
              {options.length === 0 && (
                <DropdownMenuCheckboxItem className="!cursor-default">No select options</DropdownMenuCheckboxItem>
              )}
              {options.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item.value}
                  className="capitalize cursor-pointer font-normal hover:bg-gray-100 min-h-10"
                  checked={currentValue === item.value}
                  disabled={!switchable && currentValue === item.value}
                  onCheckedChange={() => {
                    if (!switchable && currentValue === item.value) return;
                    const val = currentValue === item.value ? null : item.value;
                    setFieldValue(name, val);
                  }}
                >
                  {item.title}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
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
