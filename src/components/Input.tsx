import './Input.css';

type Size = 's' | 'm';

type InputProps = {
  label?: string;
  placeholder?: string;
  size?: Size;
};

export function Input({ label, placeholder, size = 's' }: InputProps) {
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <input placeholder={placeholder} className={`input input-${size}`} />
    </div>
  );
}

export function TextArea({ label, placeholder }: InputProps) {
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <textarea placeholder={placeholder} rows={9} />
    </div>
  );
}
