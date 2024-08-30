import ShopDetailContainer from '@/components/myInfoComponents/shopDetailContainer';
import getShopDetail from '@/apis/shop/shopDetail';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import getMyNotices from '@/apis/notice/myNotice';
import { NoticesResponse } from '@/types/myNoticeData';

interface MyShopProps {
  params: {
    shopId: string;
  };
}

export default async function myShop({ params }: MyShopProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['shopDetail', params.shopId],
    queryFn: () => getShopDetail(params.shopId),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['myNotices', params.shopId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!params.shopId) throw new Error('Shop ID is required'); // shopId가 없을 때 오류 발생
      const response = await getMyNotices(params.shopId, pageParam);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: NoticesResponse | undefined) => {
      if (!lastPage) return undefined;
      const items = lastPage.items ?? [];
      if (items.length === 0) return undefined;
      const nextOffset = lastPage.offset + items.length;
      return lastPage.hasNext ? nextOffset : undefined;
    },
  });

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShopDetailContainer shopId={params.shopId} />
      </HydrationBoundary>
    </div>
  );
}
