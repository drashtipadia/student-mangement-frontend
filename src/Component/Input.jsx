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
 * @param {InputProps} _props
 * @returns {React.ReactNode}
 */
export function Input({
  label = "",
  errorMessage = "",
  disabled = false,
  type,
  ...otherProps
} = _props) {
  return (
    <>
      <div className="flex ">
        <div className="flex-wrap min-w-fit md:m-0 ">
          <label className="uppercase p-2 text-center font-bold" htmlFor={name}>
            {otherProps.required && <Badge />}
            {label}
          </label>
        </div>

        <div className="w-full md:mb-3">
          {type !== "textarea" ? (
            <input
              className=" w-full  bg-white border rounded p-2 focus:outline-none  focus:border-black"
              spellCheck="false"
              {...otherProps}
              type={type}
              disabled={disabled}
            />
          ) : (
            <textarea
              className=" w-full  text-gray-700 border rounded p-2  focus:outline-none  focus:border-gray-500"
              {...otherProps}
              disabled={disabled}
            />
          )}
          {errorMessage && <span className="text-red-700">{errorMessage}</span>}
        </div>
      </div>
    </>
  );
}
