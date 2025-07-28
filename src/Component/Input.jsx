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
export function Input({ label = "", errorMessage = "", type, ...otherProps }) {
  return (
    <div className="flex items-center">
      {label && (
        <div className="flex-wrap min-w-fit md:m-0">
          <label
            className="uppercase p-2 text-center font-bold"
            htmlFor={otherProps.name}
          >
            {otherProps.required && <Badge />}
            {label}
          </label>
        </div>
      )}

      <div className="w-full">
        {type !== "textarea" ? (
          <input
            className="w-full bg-white border rounded p-2 focus:outline-none focus:border-black"
            spellCheck="false"
            type={type}
            id={otherProps.name}
            value={otherProps.value || undefined}
            {...otherProps}
          />
        ) : (
          <textarea
            className="w-full text-gray-700 border rounded p-2 focus:outline-none focus:border-gray-500"
            id={otherProps.name}
            value={otherProps.value || undefined}
            {...otherProps}
          />
        )}
        {errorMessage && <span className="text-red-700">{errorMessage}</span>}
      </div>
    </div>
  );
}
