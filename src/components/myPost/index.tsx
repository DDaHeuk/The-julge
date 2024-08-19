'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import NoticeList from '../noticeList';

const MyPost = () => {
  const fetchData = data.items;

  console.log('0', data.items.item);

  return (
    <div className="grid grid-cols-2 gap-x-[9px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[32px] lg:grid-cols-3">
      {fetchData.map((notice) => (
        <NoticeList key={notice.item.id} noticeData={notice} />
      ))}
    </div>
  );
};

export default MyPost;
