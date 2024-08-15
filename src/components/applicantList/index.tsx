'use client';

import fetchNoticeApplication from '@/apis/notice/fetchNoticeApplication';
import { useSuspenseQuery } from '@tanstack/react-query';
import useApplicationProcess from '@/hooks/useApplicationMutation';
import { useState } from 'react';
import Status from '../status';
import Pagination2 from '../pagenation2';

interface ApplicationItem {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    user: {
      item: {
        name: string;
        intro: string;
        phone: string;
      };
    };
  };
}

interface ApplicationData {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: ApplicationItem[];
}

interface ApplicantListProps {
  shopId: string;
  noticeId: string;
}

export default function ApplicantList({ shopId, noticeId }: ApplicantListProps) {
  const [page, setPage] = useState(0);
  const limit = 1; // 한 페이지당 나오는 item 개수. 임의로 설정. 추후 변경 필요
  const offset = page * limit;

  const { data } = useSuspenseQuery<ApplicationData>({
    queryKey: ['noticeApplication', offset, limit],
    queryFn: () => fetchNoticeApplication({ shopId, noticeId, offset, limit }),
  });

  const applicationFetchData = data?.items || [];

  const { mutate: applicationProcess } = useApplicationProcess();

  const handleAccept = (applicationId: string) => {
    applicationProcess({ applicationId, status: 'accepted' });
  };

  const handleReject = (applicationId: string) => {
    applicationProcess({ applicationId, status: 'rejected' });
  };

  return (
    <div className="border border-gray20 rounded-xl">
      <table className="w-full">
        <thead>
          <tr className="bg-red10 border-b border-pink">
            <th className="text-left text-[12px] font-normal rounded-tl-xl px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              신청자
            </th>
            <th className="text-left text-[12px] font-normal hidden md:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              소개
            </th>
            <th className="text-left text-[12px] font-normal hidden lg:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              전화번호
            </th>
            <th className="text-left text-[12px] font-normal rounded-tr-xl px-[8px] py-[12px] md:px-[12px] md:py-[20px]">
              상태
            </th>
          </tr>
        </thead>
        <tbody>
          {applicationFetchData.map((applications) => (
            <tr key={applications.item.id} className="border-b border-gray20">
              <td className="w-[50%] md:w-[33.3%] lg:w-[23.6%] text-[14px] text-left px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {applications.item.user.item.name}
              </td>
              <td className="text-[14px] text-left hidden md:w-[33.3%] lg:w-[31.1%] md:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {applications.item.user.item.intro}
              </td>
              <td className="text-[14px] text-left hidden lg:w-[20.7%] lg:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {applications.item.user.item.phone}
              </td>
              <td className="text-[14px] text-left px-[8px] py-[12px] md:w-[33.3%] md:px-[12px] md:py-[20px] lg:w-[24.4%]">
                <Status
                  stat={applications.item.status}
                  onAccept={() => handleAccept(applications.item.id)}
                  onReject={() => handleReject(applications.item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-center">
              <Pagination2
                totalPages={Math.ceil(data.count / limit)}
                currentPage={page + 1}
                onPageChange={(newPage) => setPage(newPage - 1)}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
