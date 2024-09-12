export function TableRow({ data }) {
  return (
    <tr>
      {Object.entries(data).map(([key, val]) => {
        console.log(key);
        return <td key={key}>{val || "None"}</td>;
      })}
    </tr>
  );
}
