export function SelectBox({
  name,
  label,
  placeholder,
  onChange,
  data,
  selected = "",
}) {
  return (
    <>
      <label className="col-auto text-center" htmlFor={name}>
        {label}
      </label>
      <div className="col m-0 p-0">
        <select className="form-select" name={name} onChange={onChange}>
          {placeholder && <option hidden>{placeholder}</option>}

          {data.map((entry) => {
            return (
              <option
                key={entry.value}
                value={entry.value}
                selected={selected === entry.value}
              >
                {entry.label}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
