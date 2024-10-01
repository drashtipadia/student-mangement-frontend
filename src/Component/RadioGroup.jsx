export function RadioGroup({ name, label, data, onChange, checked }) {
  return (
    <div className="row broder-3 form-group mb-3">
      <label className="col-auto text-center">{label}</label>
      {data.map((entry) => {
        return (
          <div key={entry.value} className="col-auto">
            <div className="form-check form-check-inline m-0">
              <input
                className="form-check-input"
                type="radio"
                name={name}
                id={entry.value}
                value={entry.value}
                onChange={onChange}

              />
              <label className="form-check-label" htmlFor={entry.value}>
                {entry.label}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
