import fetchNoticeApplication from '@/apis/notice/fetchNoticeApplication';
import fetchNoticeDetail from '@/apis/notice/noticeDetail';
import ApplicantList from '@/components/applicantList';
import NoticeDetailContainer from '@/components/noticeDetailContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function NoticeDetailPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['noticeDetail'],
    queryFn: fetchNoticeDetail,
  });

  const limit = 5;
  const initialOffset = 0;

  await queryClient.prefetchQuery({
    queryKey: ['noticeApplication'],
    queryFn: () => fetchNoticeApplication(limit, initialOffset),
  });

  return (
    <div className="bg-gray5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoticeDetailContainer memberType="owner" />
        <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px]">
          <h2 className="text-black text-5 font-bold md:text-[28px]">신청자목록</h2>
          <ApplicantList />
        </div>
      </HydrationBoundary>
    </div>
  );
}
