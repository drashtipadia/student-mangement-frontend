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
      <label className="col-auto text-center" htmlFor={name}>
        {required && <Badge />}
        {label}
      </label>
      <div className="col m-0 p-0">
        {type !== "textarea" ? (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            className="form-control m-0"
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
            className="form-control"
            onChange={onChange}
            placeholder={placeholder}
            spellCheck="false"
          />
        )}
        {errorMessage && <span className="text-danger">{errorMessage}</span>}
      </div>
    </>
  );
}
