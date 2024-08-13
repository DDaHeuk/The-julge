import { SelectedDate } from '@/types/date';

export const dateTimeToString = (selectedDate: SelectedDate, selectedTime?: string) => {
  const addOneDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  const formatToDisplay = (date: Date, time?: string) => {
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = time || '00:00';
    return `${dateString} ${timeString}`;
  };

  const adjustedDate = Array.isArray(selectedDate)
    ? `${formatToDisplay(addOneDay(selectedDate[0] as Date))} - ${formatToDisplay(
        addOneDay(selectedDate[1] as Date),
      )}`
    : formatToDisplay(addOneDay(selectedDate as Date), selectedTime);

  // 사용자에게 보여줄 때의 포맷
  return adjustedDate;
};

// 저장할 때 사용하는 함수 추가
export const dateTimeToISO = (selectedDate: SelectedDate, selectedTime?: string) => {
  const addOneDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  const formatToRFC3339 = (date: Date, time?: string) => {
    const dateString = date.toISOString().split('T')[0];
    const timeString = time ? `${time}:00Z` : '00:00:00Z';
    return `${dateString}T${timeString}`;
  };

  const adjustedDate = Array.isArray(selectedDate)
    ? `${formatToRFC3339(addOneDay(selectedDate[0] as Date))} - ${formatToRFC3339(
        addOneDay(selectedDate[1] as Date),
      )}`
    : formatToRFC3339(addOneDay(selectedDate as Date), selectedTime);

  // 저장할 때 사용하는 포맷
  return adjustedDate;
};

// 일하는 시간 포맷
export const formatWorkSchedule = (isoDateString: string, workhour: number) => {
  const startDate = new Date(isoDateString);

  const startYear = startDate.getFullYear();
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const startDay = String(startDate.getDate()).padStart(2, '0');
  const startHours = String(startDate.getHours()).padStart(2, '0');
  const startMinutes = String(startDate.getMinutes()).padStart(2, '0');

  const endDate = new Date(startDate.getTime() + workhour * 60 * 60 * 1000);
  const endHours = String(endDate.getHours()).padStart(2, '0');
  const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

  return `${startYear}-${startMonth}-${startDay} ${startHours}:${startMinutes}~${endHours}:${endMinutes} (${workhour}시간)`;
};
