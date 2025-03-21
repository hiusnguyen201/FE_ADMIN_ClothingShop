import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function SelectObjectField({ name, label, required = false, options, ...props }) {
  const { errors, setFieldValue, values, validateField } = props;

  return (
    <div>
      <Label className={cn('select-none mb-2 block', errors[name] && 'text-red-500')}>
        {label} {required && <span>*</span>}
      </Label>

      <div className="flex font-normal bg-transparent text-base md:text-sm w-full gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              'text-start flex items-center justify-between w-full border py-[9px] px-4 rounded',
              errors[name]
                ? 'border-red-500 focus:border-[var(--color-error-focus)]'
                : 'border-[var(--color-secondary)]'
            )}
          >
            <span className="color-[var(--color-secondary)] font-normal text-sm capitalize">
              {values[name] ? options.find((item) => item.value === values[name]).title : `Select a ${label}`}
            </span>
            <ChevronDown width={20} height={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[var(--radix-popper-anchor-width)] min-w-[200px]">
            {options.map((item) => (
              <DropdownMenuCheckboxItem
                key={item.value}
                className="capitalize cursor-pointer font-normal"
                checked={values[name] === item.value}
                onCheckedChange={() => {
                  setFieldValue(name, values[name] === item.value ? null : item.value);
                }}
                onBlur={async () => {
                  await validateField(name);
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
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  validateField: PropTypes.func,
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
