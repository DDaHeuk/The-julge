import fetchNoticeDetail from '@/apis/notice/noticeDetail';
import MyPost from '@/components/myPost';
import NoticeDetailContainer from '@/components/noticeDetailContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function MyShopNoticeDetailPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['noticeDetail'],
    queryFn: fetchNoticeDetail,
  });
  return (
    <div className="bg-gray5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoticeDetailContainer memberType="employee" />
        <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px]">
          <h2 className="text-black text-5 font-bold md:text-[28px]">최근에 본 공고이미지</h2>
          <MyPost />
        </div>
      </HydrationBoundary>
    </div>
  );
}
