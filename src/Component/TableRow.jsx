export function TableRow({ data }) {
  const DATE_KEYS = ["birth_date", "inserted_at"];
  return (
    <tr>
      {Object.entries(data).map(([key, val]) => {
        if (DATE_KEYS.includes(key)) {
          val = val.split("T")[0];
        }

        return <td key={key}>{val || "None"}</td>;
      })}
    </tr>
  );
}
