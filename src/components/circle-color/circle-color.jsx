import PropTypes from 'prop-types';

const variantColors = {
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
};

export function CircleColor({ variant, size = 10 }) {
  return (
    <div
      className="rounded-full"
      style={{
        backgroundColor: variantColors[variant],
        width: size,
        height: size,
      }}
    />
  );
}

CircleColor.propTypes = {
  variant: PropTypes.oneOf(Object.keys(variantColors)).isRequired,
  size: PropTypes.number,
};
