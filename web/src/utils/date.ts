export function getFormattedDateTime(date: string, time: string) {
  return new Date(new Date(`${date} ${time}`).getTime()).toISOString();
}

export function getFormattedDate(date) {
  return `${new Date(date).getFullYear()}-${String(
    new Date(date).getMonth() + 1
  ).padStart(2, "0")}-${String(new Date(date).getDate()).padStart(2, "0")}`;
}

export function getFormattedTime(date) {
  return (
    String(new Date(date).getUTCHours()).padStart(2, "0") +
    ":" +
    String(new Date(date).getMinutes()).padStart(2, "0")
  );
}
