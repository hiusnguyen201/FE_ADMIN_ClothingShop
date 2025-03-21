import PropTypes from 'prop-types';

export function ContentPlaceholder({ children }) {
  return <div className="sm:p-10 px-3 py-4">{children}</div>;
}

ContentPlaceholder.propTypes = {
  children: PropTypes.node,
};
