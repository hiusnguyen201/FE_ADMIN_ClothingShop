import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export function SelectStringField({ name, label, required = false, type, options, ...props }) {
  const { errors, setFieldValue, validateField } = props;

  return (
    <div>
      <Label className={cn('select-none mb-2 block', errors[name] && 'text-red-500')}>
        {label} {required && <span>*</span>}
      </Label>

      <div className="flex font-normal bg-transparent text-base md:text-sm w-full gap-5">
        {options.map((item) => (
          <Label className="flex gap-1 items-center cursor-pointer -ml-1 p-1" key={item} htmlFor={item}>
            <input
              id={item}
              type={type}
              name={name}
              value={item}
              className={cn(
                'cursor-pointer transform scale-110',
                errors[name]
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[var(--color-secondary)] focus:border-[var(--bgcl-primary)]'
              )}
              onChange={(e) => {
                setFieldValue(name, e.target.value);
              }}
              onBlur={async () => {
                await validateField(name);
              }}
            />
            <span className="select-none font-normal capitalize">{item}</span>
          </Label>
        ))}
      </div>

      {errors[name] && <p className="text-sm text-red-500 font-normal mt-2">{errors[name]}</p>}
    </div>
  );
}

SelectStringField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['radio', 'checkbox']),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
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
