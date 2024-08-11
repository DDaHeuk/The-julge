import fetchNoticeDetail from '@/apis/notice/noticeDetail';
import ApplicantList from '@/components/applicantList';
import NoticeDetailContainer from '@/components/noticeDetailContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const tableData = [
  { name: '최희문', intro: '최희문임다', phone: '010-0000-0000', status: '신청중' },
  { name: '이영희', intro: '이영희입니다', phone: '010-1111-1111', status: '대기중' },
  { name: '박철수', intro: '박철수에요', phone: '010-2222-2222', status: '완료' },
];

export default async function NoticeDetailPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['noticeDetail'],
    queryFn: fetchNoticeDetail,
  });

  return (
    <div className="bg-gray5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoticeDetailContainer memberType="owner" />
        <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px]">
          <h2 className="text-black text-5 font-bold md:text-[28px]">신청자목록</h2>
          <ApplicantList data={tableData} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
