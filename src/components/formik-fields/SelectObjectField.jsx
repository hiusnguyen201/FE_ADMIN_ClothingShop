import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SelectObjectField({
  name,
  switchable = false,
  label,
  disabled,
  required = false,
  value,
  onValueChange,
  className,
  options,
  ...props
}) {
  const { errors = {}, setFieldValue, values = {}, validateField } = props;
  const valueData = values[name] || value;

  return (
    <div className={cn("w-full", disabled && "opacity-50", className)}>
      {label && (
        <Label className={cn("select-none mb-2 block", errors[name] && "text-red-500")}>
          {label} {required && <span>*</span>}
        </Label>
      )}

      <div className="flex font-normal bg-transparent text-base md:text-sm w-full gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={disabled}
            className={cn(
              "text-start flex items-center justify-between w-full border py-[9px] px-4 rounded",
              errors[name] && "border-red-500 focus:border-red-500"
            )}
          >
            <span className={cn("capitalize font-normal text-sm pr-1")}>
              {valueData ? options.find((item) => item.value === valueData)?.title : `Select a ${label || name}`}
            </span>
            <ChevronDown width={20} height={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[var(--radix-popper-anchor-width)]">
            {options.map((item) => (
              <DropdownMenuCheckboxItem
                key={item.value}
                className="capitalize cursor-pointer font-normal"
                checked={valueData === item.value}
                disabled={!switchable && valueData === item.value}
                onCheckedChange={() => {
                  if (!switchable && valueData === item.value) return;
                  const val = valueData === item.value ? null : item.value;
                  if (setFieldValue) {
                    setFieldValue(name, val);
                  } else if (onValueChange) {
                    onValueChange(val);
                  }
                }}
                onBlur={async () => {
                  if (validateField) {
                    await validateField(name);
                  }
                }}
              >
                {item.title}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {errors[name] && <p className="text-sm text-red-500 font-normal mt-2">{errors[name]}</p>}
    </div>
  );
}

SelectObjectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  validateField: PropTypes.func,
  onValueChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  switchable: PropTypes.bool,
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
