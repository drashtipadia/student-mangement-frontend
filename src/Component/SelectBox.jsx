/* eslint-disable react/prop-types */
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
      <div className="flex p-1 items-center">
        <div className="md:mb-0">
          <label className="uppercase mb-2 font-bold" htmlFor={name}>
            {label}
          </label>
        </div>
        <div className="md:mb-0 px-1">
          <select
            className="border border-gray-500 p-1 rounded-md focus:bg-white"
            name={name}
            id={name}
            onChange={onChange}
            defaultValue={selected}
          >
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
    </>
  );
}
