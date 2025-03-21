import PropTypes from 'prop-types';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function InputField({ name, label, required = false, type, ...props }) {
  const { handleChange, handleBlur, setFieldError, validateField, errors } = props;
  return (
    <div>
      <Label className={cn('select-none mb-2 block', errors[name] && 'text-red-500')} htmlFor={name}>
        {label} {required && <span>*</span>}
      </Label>

      <input
        id={name}
        type={type}
        name={name}
        className={cn(
          'flex h-10 w-full font-normal rounded border focus:border-2 border-input bg-transparent py-[9px] px-4 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          errors[name]
            ? 'border-red-500 focus:border-[var(--color-error-focus)]'
            : 'border-[var(--color-secondary)] focus:border-[var(--bgcl-primary)]'
        )}
        onChange={(e) => {
          handleChange(e);
          setFieldError(name, false);
        }}
        onBlur={async (e) => {
          handleBlur(e);
          await validateField(name);
          e.target.blur();
        }}
      />

      {errors[name] && <p className="text-sm text-red-500 font-normal mt-2">{errors[name]}</p>}
    </div>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['email', 'text', 'number', 'password', 'tel', 'url']),
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
