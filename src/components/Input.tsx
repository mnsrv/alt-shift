import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import {
  useWatch,
  Control,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
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

type CharCounterProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  maxLength: number;
  name: Path<TFieldValues>;
};

function CharCounter<TFieldValues extends FieldValues>({
  control,
  maxLength,
  name,
}: CharCounterProps<TFieldValues>) {
  const fieldValue = useWatch({ name, control });
  const charCount = typeof fieldValue === 'string' ? fieldValue.length : 0;

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

type TextAreaProps<TFieldValues extends FieldValues = FieldValues> = {
  label?: string;
  error?: boolean;
  control?: Control<TFieldValues>;
  maxLength?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement> &
  ReturnType<UseFormRegister<TFieldValues>>;

export function TextArea<TFieldValues extends FieldValues = FieldValues>({
  label,
  className,
  maxLength,
  error,
  control,
  ...rest
}: TextAreaProps<TFieldValues>) {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="label" htmlFor={rest.id}>
          {label}
        </label>
      )}
      <textarea
        className={classNames('input', 'input-textarea', className, {
          'input-error': error,
        })}
        {...rest}
      />
      {!!maxLength && !!control && !!rest.name && (
        <CharCounter name={rest.name} control={control} maxLength={maxLength} />
      )}
    </div>
  );
}
