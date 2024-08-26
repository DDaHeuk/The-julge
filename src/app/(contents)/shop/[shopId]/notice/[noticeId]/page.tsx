import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import fetchNoticeDetail from '@/apis/notice/noticeDetail';
import MyPost from '@/components/myPost';
import NoticeDetailContainer from '@/components/noticeDetailContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Params {
  shopId: string;
  noticeId: string;
}

export default async function MyShopNoticeDetailPage({ params }: { params: Params }) {
  const queryClient = new QueryClient();

  const { shopId, noticeId } = params;

  await queryClient.prefetchQuery({
    queryKey: ['noticeDetail'],
    queryFn: () => fetchNoticeDetail({ shopId, noticeId }),
  });

  const offset = 0;
  const limit = 6;

  await queryClient.prefetchQuery({
    queryKey: ['noticeAll'],
    queryFn: () =>
      FetchAllNotice({
        offset,
        limit,
        address: undefined,
        keyword: undefined,
        startsAtGte: undefined,
        hourlyPayGte: undefined,
        sort: 'time',
      }),
  });

  return (
    <div className="bg-gray5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoticeDetailContainer shopId={shopId} noticeId={noticeId} memberType="employee" />
        <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px]">
          <h2 className="text-black text-[20px] font-bold text-5 md:text-[28px]">최근에 본 공고</h2>
          <MyPost />
        </div>
      </HydrationBoundary>
    </div>
  );
}
