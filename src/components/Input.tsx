import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useWatch, Control, FieldValues } from 'react-hook-form';
import classNames from 'classnames';

import './Input.css';

type InputProps = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, className, id, ...rest }: InputProps) {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className={classNames('input', className)} {...rest} />
    </div>
  );
}

type CharCounterProps = {
  control: Control<FieldValues>;
  maxLength: number;
  name: string;
};

function CharCounter({ control, maxLength, name }: CharCounterProps) {
  const fieldValue = useWatch({ name, control });
  const charCount = fieldValue?.length || 0;

  return (
    <div
      className={classNames('char-counter', {
        'char-counter-error': charCount > maxLength,
      })}
    >
      {`${charCount}/${maxLength}`}
    </div>
  );
}

type TextAreaProps = {
  label?: string;
  error?: boolean;
  control?: Control<FieldValues>;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({
  label,
  className,
  id,
  maxLength,
  error,
  control,
  ...rest
}: TextAreaProps) {
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
        {...rest}
      />
      {!!maxLength && !!id && !!control && (
        <CharCounter name={id} control={control} maxLength={maxLength} />
      )}
    </div>
  );
}
