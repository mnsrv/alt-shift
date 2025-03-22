import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import Icons from './Icons';

import './Button.css';

type ButtonSize = 's' | 'm';
type Variant = 'primary' | 'secondary' | 'link';
type IconPosition = 'left' | 'right';

type ButtonProps = {
  icon?: keyof typeof Icons;
  iconPosition?: IconPosition;
  title: string;
  buttonSize?: ButtonSize;
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  icon,
  iconPosition = 'left',
  title,
  buttonSize = 'm',
  variant = 'primary',
  type = 'button',
  className = '',
  ...buttonProps
}: ButtonProps) {
  const renderIcon = () => {
    if (!icon) return null;

    const Icon = Icons[icon];
    const iconSize = buttonSize === 'm' ? 24 : 20;

    return <Icon size={iconSize} />;
  };

  return (
    <button
      className={classNames(
        'btn',
        `btn-${buttonSize}`,
        `btn-${variant}`,
        className,
      )}
      type={type}
      {...buttonProps}
    >
      {iconPosition === 'left' && renderIcon()}
      {title}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
}
