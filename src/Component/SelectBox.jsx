export function SelectBox({ name, label, placeholder, onChange, data }) {
  return (
    <div className="row border-3 form-group mb-3">
      <label className="col-auto text-center" htmlFor={name}>
        {label}
      </label>
      <div className="col">
        <select className="form-select" name={name} onChange={onChange}>
          {placeholder && <option hidden>{placeholder}</option>}

          {data.map((entry) => {
            return (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
