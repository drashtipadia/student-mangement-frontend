export function Input({
  label,
  type,
  name,
  value,
  onChange,
  min = null,
  max = null,
}) {
  return (
    <div className="row border-3 form-group mb-3 align-items-center">
      <label className="col-auto text-center" htmlFor={name}>
        {label}
      </label>
      <div className="col">
        {type !== "textarea" ? (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            className="form-control"
            onChange={onChange}
            min={min}
            max={max}
          />
        ) : (
          <textarea
            id={name}
            name={name}
            value={value}
            className="form-control"
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}
