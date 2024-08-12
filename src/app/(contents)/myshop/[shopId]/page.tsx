import ShopDetailContainer from '@/components/shopDetailContainer';
import getShopDetail from '@/apis/shop/shopDetail';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function myShop() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['shopDetail'],
    queryFn: getShopDetail,
  });

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShopDetailContainer />
      </HydrationBoundary>
    </div>
  );
}
