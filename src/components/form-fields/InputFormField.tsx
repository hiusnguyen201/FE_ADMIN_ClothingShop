import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

type InputFormFieldProps = {
  name: string;
  label?: string;
  value?: any;
  editing?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  type: "email" | "text" | "number" | "password" | "tel" | "url";
  onValueChange?: (value: string) => void;
  className?: string;
  error?: string;
  required?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  ref?: React.LegacyRef<HTMLInputElement>;
  unit?: string;
} & ComponentProps<"input">;

const InputFormField = forwardRef(
  (
    {
      name,
      value,
      onValueChange,
      label,
      disabled = false,
      required = false,
      placeholder,
      autoFocus = false,
      type,
      className,
      error,
      onBlur,
      unit,
      editing = true,
      ...props
    }: InputFormFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={cn("w-full", className)}>
        {label && (
          <Label className={cn("select-none mb-2 block", editing && error && "text-red-500")} htmlFor={name}>
            {label} {required && <span>*</span>}
          </Label>
        )}

        <div className="relative">
          {unit && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">đ</span>}
          {editing ? (
            <Input
              id={name}
              ref={ref}
              disabled={disabled || !editing}
              type={type}
              autoFocus={autoFocus}
              placeholder={placeholder}
              name={name}
              onBlur={onBlur}
              value={value}
              className={cn(
                "w-full rounded focus-visible:!outline focus-visible:!outline-1",
                unit && "pl-7",
                editing && error
                  ? "border-red-500 focus:border-red-500"
                  : "focus-visible:!outline-primary focus-visible:!outline-2"
              )}
              onChange={(e) => {
                return onValueChange?.(e.target.value);
              }}
              {...props}
            />
          ) : (
            <Input
              disabled={true}
              value={value}
              placeholder={placeholder}
              className={cn(
                "w-full !opacity-100 !cursor-default bg-gray-100 rounded focus-visible:!outline focus-visible:!outline-1 focus-visible:outline-offset-0 resize-none",
                unit && "pl-7"
              )}
            />
          )}
        </div>

        {editing && error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}
      </div>
    );
  }
);

export { InputFormField };
