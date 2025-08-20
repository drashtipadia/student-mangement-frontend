/* eslint-disable react/prop-types */
export function TableRow({
  data,
  children,
  before = false,
  after,
  defValue = "None",
  ignoreCols = [],
}) {
  const fields = [];
  Object.entries(data).forEach(([k, v], idx) => {
    if (ignoreCols.includes(k)) return;
    if (v instanceof Array) {
      v.forEach((elem) => {
        fields.push(
          <td className="border border-black px-3" key={idx}>
            {elem || defValue}
          </td>
        );
      });
    } else {
      fields.push(
        <td className="border border-black px-3" key={idx}>
          {v || defValue}
        </td>
      );
    }
  });

  return (
    <tr className="text-center">
      {before && children}
      {fields.map((e) => e)}
      {after && children}
    </tr>
  );
}
