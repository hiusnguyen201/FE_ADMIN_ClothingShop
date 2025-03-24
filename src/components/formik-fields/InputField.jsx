import PropTypes from "prop-types";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function InputField({
  name,
  label,
  disabled,
  required = false,
  value,
  onValueChange,
  type,
  className,
  ...props
}) {
  const { handleChange, handleBlur, setFieldError, validateField, errors = {}, values = {} } = props;
  const valueData = values[name] || value;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block", errors[name] && "text-red-500")} htmlFor={name}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <Input
        id={name}
        disabled={disabled}
        type={type}
        placeholder={props?.placeholder}
        name={name}
        value={valueData || ""}
        className={cn(errors[name] && "border-red-500 focus:border-red-500")}
        onChange={(e) => {
          if (handleChange && setFieldError) {
            handleChange(e);
            setFieldError(name, false);
          } else if (onValueChange) {
            onValueChange(e.target.value);
          }
        }}
        onBlur={async (e) => {
          if (handleBlur && validateField) {
            handleBlur(e);
            await validateField(name);
          }
        }}
      />

      {errors[name] && <p className="text-sm text-red-500 font-normal mt-2">{errors[name]}</p>}
    </div>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(["email", "text", "number", "password", "tel", "url"]).isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  setFieldError: PropTypes.func,
  validateField: PropTypes.func,
  errors: PropTypes.object,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  className: PropTypes.string,
};

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
