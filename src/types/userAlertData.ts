export interface UserAlertResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{
    item: {
      id: string;
      createdAt: string;
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
          name: string;
          category: string;
          address1: string;
          address2: string;
          description: string;
          imageUrl: string;
          originalHourlyPay: number;
        };
        href: string;
      };
      notice: {
        item: {
          id: string;
          hourlyPay: string;
          description: string;
          startsAt: string;
          workhour: string;
          closed: boolean;
        };
        href: string;
      };
    };
    links: Array<{
      rel: string;
      description: string;
      method: string;
      href: string;
    }>;
  }>;
  links: Array<{
    rel: string;
    description: string;
    method: string;
    href: string;
  }>;
}
