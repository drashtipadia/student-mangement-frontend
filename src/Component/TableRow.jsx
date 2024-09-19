export function TableRow({ data }) {
  return (
    <tr>
      {Object.entries(data).map(([key, val]) => {
        if (key === 'birth_date') {
          val = val.split('T')[0];
        }
        if (key === "date(inserted_at)") {
          val = val.split('T')[0];
        }

        return <td key={key}>{val || "None"}</td>;
      })}
    </tr>
  );
}
