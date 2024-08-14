'use client';

import getProfileDetail from '@/apis/profile/profileDetail';
import MyList from '@/components/myList';
import MyProfileInfo from '@/components/myProfileInfo';
import NoticeAssignList from '@/components/noticeAssignList';
import NoticeAssignProfile from '@/components/noticeAssignProfile';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

const tableData = [
  {
    name: 'HS 과일주스',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    pay: '15,000원',
    status: '승인 완료',
  },
  {
    name: '써니 브렌치 레스토랑',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    pay: '15,000원',
    status: '대기중',
  },
  {
    name: '수리 메스프레소 샵',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    pay: '15,000원',
    status: '거절',
  },
];

interface ProfileDetailContainerProps {
  userId: string;
}

const ProfileDetailContainer = ({ userId }: ProfileDetailContainerProps) => {
  const { data } = userId
    ? useSuspenseQuery({
        queryKey: ['profileDetail', userId],
        queryFn: () => getProfileDetail(userId),
      })
    : { data: null }; // userId가 없을 때 data는 null로 설정
  const [list, setList] = useState<boolean>(false);
  return (
    <div className="flex flex-col">
      <div className="flex px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px] lg:py-[60px] flex-col items-start gap-[8px]">
        <div className={`flex flex-col w-[100%] ${userId ? 'lg:flex-row justify-between' : ''}`}>
          <span className={`text-black font-bold text-[20px] md:text-[28px]`}>내 프로필</span>
          {userId && data ? <MyProfileInfo profileInfo={data.item} /> : <NoticeAssignProfile />}
        </div>
      </div>
      {userId && (
        <div
          className={`flex flex-col items-start gap-[8px] px-[12px] pt-[40px] pb-[80px] md:px-[32px] md:pt-[60px] ${list ? 'md:pb-[60px]' : 'md:pb-[120px]'} lg:px-[238px] bg-gray5`}
        >
          <div className="flex-col w-[100%] gap-[16px] md:gap-[32px]">
            <span className="text-black font-bold text-[20px] md:text-[28px]">신청 내역</span>
            {list ? <MyList data={tableData} /> : <NoticeAssignList />}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileDetailContainer;
