import { cn } from "@/lib/utils";
import { FormikProps } from "formik";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/tiptap/rich-text-editor";

export type TextEditorFormikFieldProps<TData> = {
  name: keyof TData & string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  formikProps: FormikProps<TData>;
  editing?: boolean;
};

export function TextEditorFormikField<TData>({
  formikProps,
  name,
  className,
  label,
  required,
  editing = true,
}: TextEditorFormikFieldProps<TData>) {
  const { setFieldError, validateField, errors, values, setFieldValue } = formikProps;

  const currentValue: string = values[name] as string;
  const error: string = errors[name] as string;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block", error && "text-red-500")} htmlFor={name}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <RichTextEditor
        editing={editing}
        className={cn(
          "max-h-[520px] rounded focus-visible:!outline focus-visible:!outline-1 focus-visible:outline-offset-0",
          error ? "border-red-500 focus:border-red-500" : "focus-visible:!outline-primary focus-visible:!outline-2"
        )}
        value={currentValue}
        onChange={(newValue) => {
          setFieldError(name, undefined);
          setFieldValue(name, newValue);
        }}
        onBlur={() => {
          validateField(name);
        }}
      />

      {error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}
    </div>
  );
}
