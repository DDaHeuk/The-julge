export type AssignNoticeInfoData = {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
};

export type AssignNoticeResponse = {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
  };
};
