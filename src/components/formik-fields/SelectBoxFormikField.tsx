import { FormikProps } from "formik";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type SelectBoxFormikFieldProps<TData> = {
  name: string;
  label?: string;
  required?: boolean;
  type: "radio" | "checkbox";
  options: string[];
  className?: string;
  formikProps: FormikProps<TData>;
};

export function SelectBoxFormikField<TData extends { [key: string]: any }>({
  name,
  label,
  required = false,
  type,
  className,
  options,
  formikProps,
}: SelectBoxFormikFieldProps<TData>) {
  const { handleChange, handleBlur, setFieldError, validateField, errors, values, isSubmitting } = formikProps;

  const currentValue: string = values[name] as string;
  const error: string = errors[name] as string;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block", error && "text-red-500")}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <div className="flex font-normal bg-transparent text-base md:text-sm w-full gap-5">
        {options.map((item: string) => (
          <Label className="flex gap-1 items-center cursor-pointer -ml-1 p-1" key={item} htmlFor={item}>
            <Input
              tabIndex={-1}
              id={item}
              disabled={isSubmitting}
              type={type}
              name={name}
              value={item}
              checked={currentValue === item}
              className={cn("cursor-pointer transform scale-110", error && "border-red-500 focus:border-red-500")}
              onChange={(e) => {
                handleChange(e);
                setFieldError(name, undefined);
              }}
              onBlur={async (e) => {
                handleBlur(e);
                validateField(name);
              }}
            />
            <span className="select-none font-normal capitalize">{item}</span>
          </Label>
        ))}
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
