'use client';

import getProfileDetail from '@/apis/profile/profileDetail';
import MyProfileInfo from '@/components/myProfileInfo';
import NoticeAssignList from '@/components/noticeAssignList';
import NoticeAssignProfile from '@/components/noticeAssignProfile';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Status from '../status';
import getUserApplications from '@/apis/user/getUserApplications';
import { formatWorkSchedule } from '@/utils/dateTimeFormat';
import Pagination2 from '../pagenation2';

interface ProfileDetailContainerProps {
  userId: string;
  token: string | undefined;
}

interface UserApplicationItem {
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    shop: {
      item: {
        name: string;
      };
    };
    notice: {
      item: {
        hourlyPay: string;
        startsAt: string;
        workhour: number;
      };
    };
  };
}

interface UserApplicationData {
  count: number;
  items: UserApplicationItem[];
}

const ITEMS_PER_PAGE = 7;
const INITIAL_START_PAGE = 0;
const PAGE_COUNT = 5;

const ProfileDetailContainer = ({ userId, token }: ProfileDetailContainerProps) => {
  const [page, setPage] = useState<number>(INITIAL_START_PAGE);
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const limit = PAGE_COUNT;
  const offset = page * limit;
  const { data: userInfo } = userId
    ? useSuspenseQuery({
        queryKey: ['profileDetail', userId],
        queryFn: () => getProfileDetail(userId),
      })
    : { data: null }; // userId가 없을 때 data는 null로 설정

  const { data: applications } = userId
    ? useSuspenseQuery<UserApplicationData>({
        queryKey: ['myApplications', offset, limit],
        queryFn: () => getUserApplications({ userId, offset, limit, token }),
      })
    : { data: null }; // userId가 없을 때 applications는 null로 설정

  return (
    <div className="flex flex-col">
      <div className="flex px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px] lg:py-[60px] flex-col items-start gap-[8px]">
        <div
          className={`flex flex-col w-[100%] ${userId && userInfo?.item.name ? 'lg:flex-row justify-between' : ''}`}
        >
          <span className={`text-black font-bold text-[20px] md:text-[28px]`}>내 프로필</span>
          {userId && userInfo?.item.name ? (
            <MyProfileInfo profileInfo={userInfo.item} userId={userId} />
          ) : (
            <NoticeAssignProfile userId={userId} />
          )}
        </div>
      </div>
      {userId && (
        <div
          className={`flex flex-col items-start gap-[8px] px-[12px] pt-[40px] pb-[80px] md:px-[32px] md:pt-[60px] ${applications ? 'md:pb-[60px]' : 'md:pb-[120px]'} lg:px-[238px] bg-gray5`}
        >
          <div className="flex-col w-[100%] gap-[16px] md:gap-[32px]">
            <span className="text-black font-bold text-[20px] md:text-[28px]">신청 내역</span>
            {applications ? (
              <div className="border border-gray20 rounded-xl mt-[16px] md:mt-[32px]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-red10 border-b border-gray20">
                      <th className="text-left text-[12px] leading-[16px] md:leading-[22px] md:text-[14px] font-normal rounded-tl-xl px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                        가게
                      </th>
                      <th className="text-left text-[12px] leading-[16px] md:leading-[22px] md:text-[14px] font-normal hidden md:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                        일자
                      </th>
                      <th className="text-left text-[12px] leading-[16px] md:leading-[22px] md:text-[14px] font-normal hidden lg:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                        시급
                      </th>
                      <th className="text-left text-[12px] leading-[16px] md:leading-[22px] md:text-[14px] font-normal rounded-tr-xl px-[8px] py-[12px] md:px-[12px] md:py-[20px]">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.items.map((application) => (
                      <tr key={application.item.id} className="border-b border-gray20">
                        <td className="text-[14px] leading-[22px] md:leading-[26px] md:text-[16px] text-left px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                          {application.item.shop.item.name}
                        </td>
                        <td className="text-[14px] leading-[22px] md:leading-[26px] md:text-[16px] text-left hidden md:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                          {formatWorkSchedule(
                            application.item.notice.item.startsAt,
                            application.item.notice.item.workhour,
                          )}
                        </td>
                        <td className="text-[14px] leading-[22px] md:leading-[26px] md:text-[16px] text-left hidden lg:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                          {application.item.notice.item.hourlyPay}
                        </td>
                        <td className="text-[12px] md:text-[14px] text-left px-[8px] py-[9px] md:px-[12px] md:py-[20px]">
                          <Status stat={application.item.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="text-center">
                        <Pagination2
                          totalPages={Math.ceil(applications.count / limit)}
                          currentPage={page + 1}
                          onPageChange={(newPage) => setPage(newPage - 1)}
                        />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <NoticeAssignList />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileDetailContainer;
