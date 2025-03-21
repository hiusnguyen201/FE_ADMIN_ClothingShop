import PropTypes from 'prop-types';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { capitalizeStr } from '@/utils/string';

export function SelectField({ name, label, required = false, type, options, ...props }) {
  const { errors, setFieldValue } = props;

  return (
    <div>
      <Label className={cn('select-none mb-2 block', errors[name] && 'text-red-500')} htmlFor={name}>
        {label} {required && <span>*</span>}
      </Label>

      <div className="flex font-normal bg-transparent text-base md:text-sm w-full gap-5">
        {options.map((item) => {
          if (type === 'radio') {
            return (
              <Label className="flex gap-1 items-center cursor-pointer -ml-1 p-1" key={item} htmlFor={item}>
                <input
                  id={item}
                  type={type}
                  name={name}
                  value={item}
                  className={cn(
                    'cursor-pointer transform scale-110',
                    errors[name]
                      ? 'border-red-500 focus:border-[var(--color-error-focus)]'
                      : 'border-[var(--color-secondary)] focus:border-[var(--bgcl-primary)]'
                  )}
                  onChange={async (e) => {
                    setFieldValue(name, e.target.value);
                  }}
                />
                <span className="select-none font-normal">{capitalizeStr(item.toLowerCase())}</span>
              </Label>
            );
          }
        })}
      </div>

      {errors[name] && <p className="text-sm text-red-500 font-normal mt-2">{errors[name]}</p>}
    </div>
  );
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['radio', 'checkbox', 'select']),
  options: PropTypes.array.isRequired,
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
