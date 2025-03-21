import PropTypes from 'prop-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { letterColors } from '@/components/letter-avatar/letter-color';

export const LetterAvatar = ({ alt, src }) => {
  const firstLetterUpperCase = alt[0].toUpperCase();
  return (
    <Avatar>
      {src ? (
        <AvatarImage src={src} alt={alt} />
      ) : (
        <AvatarFallback
          className="text-white uppercase w-full h-full flex items-center justify-center font-normal"
          style={{ backgroundColor: letterColors[firstLetterUpperCase] }}
        >
          {firstLetterUpperCase}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

LetterAvatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
};
