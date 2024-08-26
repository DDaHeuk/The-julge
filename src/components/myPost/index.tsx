'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import NoticeList from '../noticeList';

interface ShopItem {
  id: string;
  name: string;
  imageUrl?: string;
  address1: string;
  originalHourlyPay: number;
}

interface NoticeItem {
  id: string;
  closed: boolean;
  startsAt: string;
  workhour: number;
  hourlyPay: number;
  shop: {
    item: ShopItem;
  };
}

interface Notice {
  item: NoticeItem;
}

interface NoticeListResponse {
  items: Notice[];
  totalCount: number;
}

const MyPost = () => {
  const offset = 0;
  const limit = 6;

  const { data } = useSuspenseQuery<NoticeListResponse>({
    queryKey: ['noticeAll', offset, limit],
    queryFn: () =>
      FetchAllNotice({
        offset,
        limit,
        address: undefined,
        keyword: undefined,
        startsAtGte: undefined,
        hourlyPayGte: undefined,
        sort: 'time',
      }),
  });

  const fetchData = data.items;

  return (
    <div className="grid grid-cols-2 gap-x-[9px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[32px] lg:grid-cols-3">
      {fetchData.map((notice) => (
        <NoticeList key={notice.item.id} noticeData={notice} />
      ))}
    </div>
  );
};

export default MyPost;
