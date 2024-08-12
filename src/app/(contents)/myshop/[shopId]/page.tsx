import ShopDetailContainer from '@/components/shopDetailContainer';
import getShopDetail from '@/apis/shop/shopDetail';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface MyShopProps {
  params: {
    shopId: string;
  };
}

export default async function myShop({ params }: MyShopProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['shopDetail'],
    queryFn: () => getShopDetail(params.shopId),
  });

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShopDetailContainer shopId={params.shopId} />
      </HydrationBoundary>
    </div>
  );
}
