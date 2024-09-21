import { Link } from "react-router-dom";

export function TableRow({ data }) {
  // const DATE_KEYS = ["birth_date", "inserted_at"];
  return (
    <tr>
      {Object.entries(data).map(([key, val]) => {
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
