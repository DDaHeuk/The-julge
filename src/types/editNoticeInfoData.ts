export type EditNoticeInfoData = {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
};

export type EditNoticeResponse = {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: {
      item: {
        id: string;
      };
    };
  };
};
