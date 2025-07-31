import { Badge } from "./Badge";

/**
 *
 * @typedef {{
 * label: string;
 * errorMessage: string;
 * disabled: boolean;
 * } & React.AllHTMLAttributes<HTMLInputElement>} InputProps
 */

/**
 * @param {InputProps} arg0
 * @returns {React.ReactNode}
 */
/* eslint-disable react/prop-types */
export function Input({
  label = "",
  errorMessage = "",
  type,
  required = true,
  ...otherProps
}) {
  return (
    <div className="relative">
      {type !== "textarea" ? (
        <input
          className="w-full peer py-3 text-[16px] border-2 px-2 rounded-sm focus:border-3 valid:border-3 valid:border-primary border-outline-variant focus:border-primary outline-none bg-transparent"
          spellCheck="false"
          type={type}
          id={otherProps.name}
          value={otherProps.value || undefined}
          {...otherProps}
          required={required}
        />
      ) : (
        <textarea
          className="w-full peer py-3 text-[16px] border-2 px-2 rounded-sm focus:border-3 valid:border-3 valid:border-primary border-outline-variant focus:border-primary outline-none bg-transparent"
          id={otherProps.name}
          value={otherProps.value || undefined}
          {...otherProps}
          required={required}
        />
      )}
      {errorMessage && <span className="text-red-700">{errorMessage}</span>}

      {label && (
        <label
          className="block absolute text-[16px] transition-all top-[50%] left-3 px-1 translate-y-[-50%] peer-valid:top-0 peer-focus:top-0 peer-valid:text-[12px] peer-focus:text-[12px] peer-valid:text-primary peer-focus:text-primary bg-slate-100  pointer-events-none text-on-surface ease-mateiral-default "
          htmlFor={otherProps.name}
        >
          {otherProps.required && <Badge />}
          {label}
        </label>
      )}
    </div>
  );
}
