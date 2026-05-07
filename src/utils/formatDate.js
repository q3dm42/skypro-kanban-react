/**
 * Форматирует дату из ISO формата (2026-04-22T16:00:00.000Z) в формат DD.MM.YY
 * @param {string | Date} date - Дата в любом формате
 * @returns {string} Отформатированная дата в формате DD.MM.YY
 */
export function formatDate(date) {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "";
    }

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear()).slice(-2);

    return `${day}.${month}.${year}`;
  } catch (err) {
    return "";
  }
}
