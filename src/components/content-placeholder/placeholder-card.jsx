import PropTypes from 'prop-types';
import { Card } from '@/components/ui/card';
import { MainButton } from '@/components/custom/main-button';
import { PlusIcon } from 'lucide-react';

export function PlaceholderCard({ title, description, icon: Icon, actionText, onActionClick }) {
  return (
    <Card className="mt-4 max-w-5xl mx-auto sm:p-10 px-3 py-8 text-center bg-white shadow-lg border border-gray-200">
      {Icon && <Icon className="sm:w-60 sm:h-60 w-52 h-52 mx-auto mb-4" />}

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-gray-600 text-sm mt-2 max-w-md mx-auto">{description}</p>

      {actionText && (
        <MainButton onClick={onActionClick} icon={<PlusIcon />} className="mt-4">
          {actionText}
        </MainButton>
      )}
    </Card>
  );
}

PlaceholderCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.func,
  actionText: PropTypes.string,
  onActionClick: PropTypes.func,
};
