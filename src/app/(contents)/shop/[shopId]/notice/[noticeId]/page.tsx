import fetchNoticeDetail from '@/apis/notice/noticeDetail';
import MyPost from '@/components/myPost';
import NoticeDetailContainer from '@/components/noticeDetailContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

interface Params {
  shopId: string;
  noticeId: string;
}

export default async function MyShopNoticeDetailPage({ params }: { params: Params }) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const { shopId, noticeId } = params;

  await queryClient.prefetchQuery({
    queryKey: ['noticeDetail'],
    queryFn: () => fetchNoticeDetail({ shopId, noticeId, token }),
  });

  return (
    <div className="bg-gray5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoticeDetailContainer shopId={shopId} noticeId={noticeId} token={token} />
        <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[400px]">
          <h2 className="text-black text-[20px] font-bold text-5 md:text-[28px]">최근에 본 공고</h2>
          <MyPost />
        </div>
      </HydrationBoundary>
    </div>
  );
}
