/**
 * Converts given HTML table to the CSV file.
 * @param {HTMLTableElement} table Target table to extract data.
 * @param {number} maxCols Maximum columns to add to the csv file.
 * @returns object URL of created CSV file
 */
export function convertToCSV(table, maxCols = -1) {
  if (!(table instanceof HTMLTableElement))
    throw new Error("`table` not a table. How the turn-tables?");

  const rows = table.querySelectorAll("tr");
  let content = "";

  rows.forEach((row) => {
    const columns = row.querySelectorAll("th, td");

    columns.forEach((column, idx) => {
      if (maxCols !== -1 && idx + 1 > maxCols) return;

      const text = column.textContent.trim().replace(",", "");
      content += text + ",";
    });
    content += "\r\n";
  });

  // I did not say blob, I said bub.
  const bub = new Blob([content], {
    type: "text/csv",
  });

  return URL.createObjectURL(bub);
}
