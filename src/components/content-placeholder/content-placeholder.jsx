import PropTypes from 'prop-types';

export function ContentPlaceholder({ children, ...props }) {
  return (
    <div className="py-10 px-6 max-w-6xl mx-auto w-full" {...props}>
      {children}
    </div>
  );
}

ContentPlaceholder.propTypes = {
  children: PropTypes.node,
};
