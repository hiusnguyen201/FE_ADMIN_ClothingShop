import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type InputFormFieldProps = {
  name: string;
  label?: string;
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  type: "email" | "text" | "number" | "password" | "tel" | "url";
  onValueChange?: (value: string) => void;
  className?: string;
  error?: string;
  required?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  min?: number;
  ref?: React.LegacyRef<HTMLInputElement>;
};

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
      min,
    }: InputFormFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={cn("w-full", className)}>
        {label && (
          <Label className={cn("select-none mb-2 block", error && "text-red-500")} htmlFor={name}>
            {label} {required && <span>*</span>}
          </Label>
        )}

        <Input
          id={name}
          ref={ref}
          disabled={disabled}
          type={type}
          autoFocus={autoFocus}
          placeholder={placeholder}
          name={name}
          onBlur={onBlur}
          value={value}
          min={min}
          className={cn(
            "w-full rounded focus-visible:!outline focus-visible:!outline-1",
            error ? "border-red-500 focus:border-red-500" : "focus-visible:!outline-primary focus-visible:!outline-2"
          )}
          onChange={(e) => {
            onValueChange?.(e.target.value);
          }}
        />

        {error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}
      </div>
    );
  }
);

export { InputFormField };
