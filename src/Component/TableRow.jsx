export function TableRow({ data }) {
  return (
    <tr>
      {Object.entries(data).map(([key, val]) => {
        return <td key={key}>{val || "None"}</td>;
      })}
    </tr>
  );
}
