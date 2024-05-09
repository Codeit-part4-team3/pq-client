export const daysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const getTimes = (date: Date) => {
  const newDate = new Date(date);
  return newDate.getHours().toString().padStart(2, '0') + ':' + newDate.getMinutes().toString().padStart(2, '0');
};
