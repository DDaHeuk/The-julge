import ShopDetailContainer from '@/components/shopDetailContainer';
import getShopDetail from '@/apis/shop/shopDetail';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import getMyNotices from '@/apis/notice/myNotice';

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

  await queryClient.prefetchQuery({
    queryKey: ['myNotices', params.shopId],
    queryFn: () => getMyNotices(params.shopId, 0, 6),
  });

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShopDetailContainer shopId={params.shopId} />
      </HydrationBoundary>
    </div>
  );
}
