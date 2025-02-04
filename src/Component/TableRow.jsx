// import { Link } from "react-router-dom";

export function TableRow({
  data,
  children,
  before = false,
  after,
  defValue = "None",
  ignoreCols = [],
}) {
  const INSTITUTE_TYPE = localStorage.getItem("token");
  const GIA_COls = [
    "main_course",
    "first_secondary_subject",
    "tertiary_secondary_subject",
    "elective_course",
  ];

  const fields = [];
  Object.entries(data).forEach(([k, v]) => {
    if (INSTITUTE_TYPE !== "GIA" && GIA_COls.includes(k)) return;
    if (ignoreCols.includes(k)) return;

    if (v instanceof Array) {
      v.forEach((elem) => {
        fields.push(
          <td className="border border-black" key={k}>
            {elem || defValue}
          </td>
        );
      });
    } else {
      fields.push(
        <td className="border border-black" key={k}>
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
