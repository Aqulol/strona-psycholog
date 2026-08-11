import type { ChangeEvent } from 'react';

type InputProps = {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  textarea?: boolean;
};

const fieldStyles =
  'w-full rounded border border-border bg-white p-4 text-ink placeholder:text-ink/70 focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-0';

/** Pole formularza z etykietą, komunikatem błędu i obsługą textarea. */
export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  required,
  value,
  onChange,
  error,
  autoComplete,
  textarea = false,
}: InputProps) {
  const describedBy = error ? `${id}-error` : undefined;
  const errorMarkup = error ? (
    <p id={`${id}-error`} className="mt-1 text-sm text-red-700" role="alert">
      {error}
    </p>
  ) : null;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={fieldStyles}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={fieldStyles}
        />
      )}
      {errorMarkup}
    </div>
  );
}

export type { InputProps };
