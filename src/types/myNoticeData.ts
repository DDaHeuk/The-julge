export interface NoticeData {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

export interface NoticeDataItem {
  item: NoticeData;
}

export interface NoticesResponse {
  items: NoticeDataItem[]; // NoticeItem 배열
  hasNext: boolean; // 다음 페이지가 있는지 여부
}
