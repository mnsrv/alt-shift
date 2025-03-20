import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import './Input.css';

type InputSize = 's' | 'm';

type InputProps = {
  label?: string;
  inputSize?: InputSize;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({
  label,
  inputSize = 's',
  className = '',
  id,
  ...rest
}: InputProps) {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={classNames('input', `input-${inputSize}`, className)}
        {...rest}
      />
    </div>
  );
}

type TextAreaProps = {
  label?: string;
  error?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({
  label,
  className = '',
  id,
  maxLength,
  onChange,
  error,
  ...rest
}: TextAreaProps) {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  return (
    <div className="input-wrapper">
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={classNames('input', 'input-textarea', className, {
          'input-error': error,
        })}
        onChange={handleChange}
        {...rest}
      />
      {maxLength && (
        <div
          className={classNames('char-counter', {
            'char-counter-error': charCount > maxLength,
          })}
        >
          {`${charCount}/${maxLength}`}
        </div>
      )}
    </div>
  );
}
