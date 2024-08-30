import fetchNoticeApplication from '@/apis/notice/fetchNoticeApplication';
import fetchNoticeDetail from '@/apis/notice/noticeDetail';
import ApplicantList from '@/components/commonComponents/applicantList';
import NoticeDetailContainer from '@/components/noticeComponents/noticeDetailContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

interface Params {
  shopId: string;
  noticeId: string;
}

export default async function NoticeDetailPage({ params }: { params: Params }) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const { shopId, noticeId } = params;

  await queryClient.prefetchQuery({
    queryKey: ['noticeDetail'],
    queryFn: () => fetchNoticeDetail({ shopId, noticeId, token }),
  });

  const limit = 5;
  const initialOffset = 0;

  await queryClient.prefetchQuery({
    queryKey: ['noticeApplication'],
    queryFn: () => fetchNoticeApplication({ shopId, noticeId, offset: initialOffset, limit }),
  });

  return (
    <div className="bg-gray5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoticeDetailContainer shopId={shopId} noticeId={noticeId} token={token} />
        <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[400px]">
          <h2 className="text-black text-5 font-bold md:text-[28px]">신청자목록</h2>
          <ApplicantList shopId={shopId} noticeId={noticeId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
