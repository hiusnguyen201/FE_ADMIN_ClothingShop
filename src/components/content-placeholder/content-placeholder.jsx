import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

export function ContentPlaceholder({ children, ...props }) {
  return (
    <div
      className={cn('py-10 px-6 sm:max-w-5xl max-w-6xl mx-auto w-full flex flex-col align-items justify-start')}
      {...props}
    >
      {children}
    </div>
  );
}

ContentPlaceholder.propTypes = {
  children: PropTypes.node.isRequired,
};
