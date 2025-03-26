import { FormikProps } from "formik";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type InputFormikFieldProps<TData> = {
  name: keyof TData & string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type: "email" | "text" | "number" | "password" | "tel" | "url";
  className?: string;
  formikProps: FormikProps<TData>;
};

export function InputFormikField<TData>({
  name,
  label,
  disabled,
  required = false,
  placeholder,
  type,
  className,
  formikProps,
}: InputFormikFieldProps<TData>) {
  const { handleChange, handleBlur, setFieldError, validateField, errors, values } = formikProps;
  const currentValue: string = values[name] as string;
  const error: string = errors[name] as string;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block", error && "text-red-500")} htmlFor={name}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <Input
        id={name}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        name={name}
        value={currentValue}
        className={cn(error && "border-red-500 focus:border-red-500")}
        onChange={(e) => {
          handleChange(e);
          setFieldError(name, undefined);
        }}
        onBlur={async (e) => {
          handleBlur(e);
          await validateField(name);
        }}
      />

      {error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}
    </div>
  );
}
