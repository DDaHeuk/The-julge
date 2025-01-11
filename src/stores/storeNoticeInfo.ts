import { create } from 'zustand';
import COMMON_NOTICE_DATA from '@/constant/Notice/CommonNoticeData';

interface NoticeInfoState {
  noticeData: typeof COMMON_NOTICE_DATA;
  setNoticeData: (newData: Partial<typeof COMMON_NOTICE_DATA>) => void;
  resetAll: () => void;
}

const useStoreNoticeInfo = create<NoticeInfoState>((set) => ({
  noticeData: { ...COMMON_NOTICE_DATA },
  setNoticeData: (newData: Partial<typeof COMMON_NOTICE_DATA>) =>
    set((state) => ({
      noticeData: { ...state.noticeData, ...newData },
    })),
  resetAll: () => set({ noticeData: { ...COMMON_NOTICE_DATA } }),
}));

export default useStoreNoticeInfo;
