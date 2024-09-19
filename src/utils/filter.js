/**
 * @param {string} fieldName field name to sort by
 * @param {any[]} records array of records to sort
 */
export default function sortStudentBy(fieldName, records) {
  return records.sort((a, b) => {
    if (a instanceof Date && b instanceof Date) {
      return a - b;
    }

    return a[fieldName].toString().localeCompare(b[fieldName].toString());
  });
}
