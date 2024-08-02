import { SelectedDate } from '@/types/date';

export const dateTimeToString = (selectedDate: SelectedDate, selectedTime: string) => {
  const addOneDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };
  const adjustedDate = Array.isArray(selectedDate)
    ? `${
        addOneDay(selectedDate[0] as Date)
          .toISOString()
          .split('T')[0]
      } - ${
        addOneDay(selectedDate[1] as Date)
          .toISOString()
          .split('T')[0]
      }`
    : addOneDay(selectedDate as Date)
        .toISOString()
        .split('T')[0] || '';

  // 최종 입력 값 포맷
  return `${adjustedDate} ${selectedTime}`;
};
