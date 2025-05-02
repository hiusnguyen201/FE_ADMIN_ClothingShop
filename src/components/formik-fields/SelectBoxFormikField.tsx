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
  direction?: "column" | "row";
  editing?: boolean;
};

export function SelectBoxFormikField<TData extends { [key: string]: any }>({
  editing = true,
  name,
  label,
  required = false,
  type,
  className,
  options,
  direction = "row",
  formikProps,
}: SelectBoxFormikFieldProps<TData>) {
  const { handleChange, handleBlur, setFieldError, validateField, errors, values, isSubmitting } = formikProps;

  const currentValue: string = values[name] as string;
  const error: string = errors[name] as string;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block", editing && error && "text-red-500")}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <div
        className={cn(
          "flex font-normal bg-transparent text-base md:text-sm w-full gap-1",
          direction === "column" ? "flex-col" : "flex-row"
        )}
      >
        {options.map((item: string) => (
          <Label
            className={cn(
              "inline-flex gap-2 items-center text-base -ml-1 p-1",
              editing ? "cursor-pointer" : "cursor-default"
            )}
            key={item}
            htmlFor={item}
          >
            {editing ? (
              <Input
                tabIndex={-1}
                id={item}
                disabled={isSubmitting}
                type={type}
                name={name}
                value={item}
                checked={currentValue === item}
                className={cn(
                  "cursor-pointer w-auto h-auto transform scale-110",
                  error && "border-red-500 focus:border-red-500"
                )}
                onChange={(e) => {
                  handleChange(e);
                  setFieldError(name, undefined);
                }}
                onBlur={async (e) => {
                  handleBlur(e);
                  validateField(name);
                }}
              />
            ) : (
              <Input
                tabIndex={-1}
                id={item}
                disabled={true}
                type={type}
                name={name}
                value={item}
                checked={currentValue === item}
                className={cn("!cursor-default !opacity-100 w-auto h-auto transform scale-110")}
              />
            )}

            <span className="select-none font-normal capitalize">{item}</span>
          </Label>
        ))}
      </div>

      {editing && error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}
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
