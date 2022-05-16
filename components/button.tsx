import React from 'react';
import classNames from 'classnames';
import ButtonType from '../enums/button-type';
import BackgroundColorType from '../enums/background-color-type';

type Props = {
  Icon: React.FunctionComponent;
  label?: string;
  type?: ButtonType;
  onClick?: () => void;
  isDisabled?: boolean;
  backgroundColorType?: BackgroundColorType;
};

const Button = ({
  Icon,
  label,
  type = ButtonType.ACCENT,
  onClick,
  isDisabled = false,
  backgroundColorType = BackgroundColorType.PRIMARY,
}: Props) => {
  return (
    <button
      className={classNames('rounded-full border', {
        'p-2': !label,
        'px-4 py-2 flex items-center justify-center gap-2': label,
        'border-transparent  [background-clip:_padding-box,_border-box]':
          type === ButtonType.ACCENT,
        'bg-[linear-gradient(#353545,_#353545),_linear-gradient(#FF832B,_#FFC02B)]':
          backgroundColorType === BackgroundColorType.SECONDARY,
        'bg-[linear-gradient(#1A1A22,_#1A1A22),_linear-gradient(#FF832B,_#FFC02B)]':
          backgroundColorType === BackgroundColorType.PRIMARY,
        'border-primaryText': type === ButtonType.WHITE,
        'opacity-50': isDisabled,
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon></Icon>
      {label && (
        <p
          className={classNames('font-bold', {
            'bg-gradient-to-r from-accentFrom to-accentTo bg-clip-text text-transparent':
              type === ButtonType.ACCENT,
            'text-primary': type === ButtonType.WHITE,
          })}
        >
          {label}
        </p>
      )}
    </button>
  );
};

export default Button;
