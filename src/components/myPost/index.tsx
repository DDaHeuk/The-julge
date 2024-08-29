'use client';

import useRecentStore from '@/stores/storeRecentNotices';
import NoticeList from '../noticeList';

const MyPost = () => {
  const { recentNotices } = useRecentStore();

  return (
    <div className="grid grid-cols-2 gap-x-[9px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[32px] lg:grid-cols-3">
      {recentNotices.map((notice) => (
        <NoticeList key={notice.item.id} noticeData={notice} />
      ))}
    </div>
  );
};

export default MyPost;
