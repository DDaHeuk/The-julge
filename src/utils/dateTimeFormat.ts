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

//데이터를 불러와서 날짜와 시간 분리해주는 유틸함수
export const storedDataTimeToString = (
  isoString: string,
): { selectedDate: SelectedDate; selectedTime: string } => {
  // ISO 문자열을 Date 객체로 변환
  const date = new Date(isoString);

  // 날짜 부분 (YYYY-MM-DD)와 시간 부분 (HH:MM)으로 분리
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const timeString = date.toISOString().split('T')[1].slice(0, 5); // HH:MM

  // Date 객체는 그대로 반환
  return {
    selectedDate: date, // Date 객체
    selectedTime: timeString, // 시간 문자열
  };
};

// 일하는 시간 포맷
export const formatWorkSchedule = (isoDateString: string, workhour: number) => {
  // UTC 시간 기준으로 Date 객체 생성
  const startDate = new Date(isoDateString);

  const startYear = startDate.getUTCFullYear();
  const startMonth = String(startDate.getUTCMonth() + 1).padStart(2, '0');
  const startDay = String(startDate.getUTCDate()).padStart(2, '0');
  const startHours = String(startDate.getUTCHours()).padStart(2, '0');
  const startMinutes = String(startDate.getUTCMinutes()).padStart(2, '0');

  // 종료 시간 계산 (UTC 기준)
  const endDate = new Date(startDate.getTime() + workhour * 60 * 60 * 1000);
  const endYear = endDate.getUTCFullYear();
  const endMonth = String(endDate.getUTCMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getUTCDate()).padStart(2, '0');
  const endHours = String(endDate.getUTCHours()).padStart(2, '0');
  const endMinutes = String(endDate.getUTCMinutes()).padStart(2, '0');

  // 종료 날짜가 시작 날짜와 같은지 확인
  const sameDay = startYear === endYear && startMonth === endMonth && startDay === endDay;

  const formattedEnd = sameDay
    ? `${endHours}:${endMinutes}`
    : `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}`;

  return `${startYear}-${startMonth}-${startDay} ${startHours}:${startMinutes}~${formattedEnd} (${workhour}시간)`;
};
