/**
 * Formats a date string into a more readable format.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
export function dateFormat(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}/${month}`;
}
