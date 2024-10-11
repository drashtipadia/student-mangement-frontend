// import { Link } from "react-router-dom";

export function TableRow({ data, children, before = false, after, defValue = "None" }) {
  const INSTITUTE_TYPE = localStorage.getItem("token");
  const IGNORE_COLS = ['id', 'institute_type'];
  const GIA_COls = [
    "main_course",
    "first_secondary_subject",
    "tertiary_secondary_subject",
    "elective_course",
  ];

  const fields = [];
  Object.entries(data).forEach(([k, v]) => {
    if (INSTITUTE_TYPE !== "GIA" && GIA_COls.includes(k)) return;
    if (IGNORE_COLS.includes(k)) return;

    if (v instanceof Array) {
      v.forEach((elem) => {
        fields.push(<td key={k}>{elem || defValue}</td>);
      });
    } else {
      fields.push(<td key={k}>{v || defValue}</td>);
    }
  });

  return (
    <tr>
      {before && children}
      {fields.map((e) => e)}
      {after && children}
    </tr>
  );
}
