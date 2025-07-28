/* eslint-disable react/prop-types */
export function RadioGroup({ name, label, data, onChange, checked }) {
  return (
    <div className="flex flex-wrap pb-3">
      <label className="text-center text-lg mx-2 font-bold">{label}</label>
      {data.map((entry) => {
        return (
          <div key={entry.value} className="px-4">
            <div className="items-center m-0">
              <input
                className="h-4 w-4 rounded-full border accent-primary transition-all"
                type="radio"
                name={name}
                id={entry.label}
                value={entry.value}
                onChange={onChange}
                checked={checked == entry.value}
              />
              <label className="mx-1 text-lg" htmlFor={entry.label}>
                {entry.label}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
