import Icons from './Icons';

import './Button.css';

type Size = 's' | 'm';
type Variant = 'primary' | 'secondary';

type ButtonProps = {
  icon?: keyof typeof Icons;
  title: string;
  size?: Size;
  variant?: Variant;
};

export default function Button({
  icon,
  title,
  size = 'm',
  variant = 'primary',
}: ButtonProps) {
  const Icon = Icons[icon];

  const btnClass = `btn btn-${size} btn-${variant}`;

  return (
    <button className={btnClass}>
      {icon ? <Icon size={size === 'm' ? 24 : 20} /> : null}
      {title}
    </button>
  );
}
