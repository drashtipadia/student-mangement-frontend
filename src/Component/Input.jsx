import { Badge } from "./Badge";

export function Input({
  label = "",
  type,
  name,
  value,
  onChange,
  min = null,
  max = null,
  placeholder,
  accept = null,
  required = false,
  errorMessage = "",
}) {
  return (
    <>
      <div className="flex ">
        <div className="flex-wrap min-w-fit md:m-0">
          <label className="uppercase px-2 text-center" htmlFor={name}>
            {required && <Badge />}
            {label}
          </label>
        </div>

        <div className="w-full md:mb-3">
          {type !== "textarea" ? (
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              className=" w-full  bg-white border rounded p-2 focus:outline-none  focus:border-black"
              onChange={onChange}
              min={min}
              max={max}
              placeholder={placeholder}
              accept={accept}
              spellCheck="false"
            />
          ) : (
            <textarea
              id={name}
              name={name}
              value={value}
              className=" w-full  text-gray-700 border rounded p-2  focus:outline-none  focus:border-gray-500"
              onChange={onChange}
              placeholder={placeholder}
              spellCheck="false"
            />
          )}
          {errorMessage && <span className="text-red-700">{errorMessage}</span>}
        </div>
      </div>
    </>
  );
}
