export interface UserAlertResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: [
    {
      item: {
        id: string;
        result: string;
        read: boolean;
        application: {
          item: {
            id: string;
            status: string;
          };
          href: string;
        };
        shop: {
          item: {
            id: string;
          };
          href: string;
        };
        notice: {
          item: {
            id: string;
          };
          href: string;
        };
      };
    },
  ];
}
