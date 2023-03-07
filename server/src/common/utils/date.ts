function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function getDateDay(date: Date) {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join('-');
}

export function getDateMonth(date: Date) {
  return [padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('-');
}

export function getOneWeekBefore() {
  const nowDate = new Date();
  nowDate.setDate(nowDate.getDate() - 6);
  nowDate.setHours(0, 0, 0, 0);
  return nowDate;
}
