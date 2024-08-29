import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface RecentNoticesState {
  recentNotices: Notice[];
  addNotice: (item: Notice) => void;
}

const useRecentStore = create(
  persist<RecentNoticesState>(
    (set) => ({
      recentNotices: [],
      addNotice: (
        item: Notice, // 매개변수 타입을 명시
      ) =>
        set((state) => {
          const updatedNotices = [item, ...state.recentNotices].filter(
            (value, index, self) => self.findIndex((v) => v.item.id === value.item.id) === index,
          ); // item.id로 중복 제거
          if (updatedNotices.length > 6) {
            updatedNotices.pop(); // 6개 초과 시 가장 오래된 것 제거
          }
          return { recentNotices: updatedNotices };
        }),
    }),
    {
      name: 'RECENT_NOTICES',
    },
  ),
);

export default useRecentStore;
