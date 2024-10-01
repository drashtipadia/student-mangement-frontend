import { Link } from "react-router-dom";

export function TableRow({ data }) {
  const inst_type = localStorage.getItem("token");
  const GIA_COls = ['main_course', 'first_secondary_subject', 'tertiary_secondary_subject', 'elective_course'];

  // const DATE_KEYS = ["birth_date", "inserted_at"];
  return (


    <tr>
      {Object.entries(data).map(([key, val]) => {

        if (inst_type !== "GIA" && GIA_COls.includes(key)) {
          return;
        }
        if (key === "birth_date") {
          val = val.split("T")[0];
        }

        return <td key={key}>{val || "None"}</td>;
      })}
      <td>
        <Link to={`/students/${data.id}`}>View Details &rarr;</Link>
      </td>
    </tr>
  );
}
