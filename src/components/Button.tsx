import { ButtonHTMLAttributes } from 'react';

import Icons from './Icons';

import './Button.css';

type Size = 's' | 'm';
type Variant = 'primary' | 'secondary';

type ButtonProps = {
  icon?: keyof typeof Icons;
  title: string;
  size?: Size;
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  icon,
  title,
  size = 'm',
  variant = 'primary',
  type = 'button',
  className = '',
  ...buttonProps
}: ButtonProps) {
  const btnClass = `btn btn-${size} btn-${variant} ${className}`.trim();

  const renderIcon = () => {
    if (!icon) return null;

    const Icon = Icons[icon];
    const iconSize = size === 'm' ? 24 : 20;

    return <Icon size={iconSize} />;
  };

  return (
    <button className={btnClass} type={type} {...buttonProps}>
      {renderIcon()}
      {title}
    </button>
  );
}
