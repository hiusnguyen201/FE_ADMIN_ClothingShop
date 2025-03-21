import PropTypes from 'prop-types';
import { MainButton } from '@/components/custom/main-button';
import { PlusIcon } from 'lucide-react';

export function Heading({ title, description, actionText, onActionClick }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl fw-500">{title}</h1>
        {actionText && <MainButton onClick={onActionClick} icon={<PlusIcon />} children={actionText} />}
      </div>
      <p className="mt-4 text-gray-600 text-sm">{description}</p>
    </div>
  );
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionText: PropTypes.string,
  onActionClick: PropTypes.func,
};
