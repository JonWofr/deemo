import React from 'react';
import classNames from 'classnames';
import ButtonType from '../enums/button-type';

type Props = {
  Icon: React.FunctionComponent;
  label?: string;
  type?: ButtonType;
  onClick?: () => void;
  isDisabled?: boolean;
};

const Button = ({
  Icon,
  label,
  type = ButtonType.ACCENT,
  onClick,
  isDisabled = false,
}: Props) => {
  return (
    <button
      className={classNames('rounded-full border', {
        'p-2': !label,
        'px-4 py-2 flex items-center gap-2': label,
        'border-transparent bg-[linear-gradient(#353545,_#353545),_linear-gradient(#FF832B,_#FFC02B)] [background-clip:_padding-box,_border-box]':
          type === ButtonType.ACCENT,
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
