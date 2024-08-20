import CustomNotice from '@/components/customNotice';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import AllNotices from '@/components/allNotices';
import { cookies } from 'next/headers';

export default async function Home() {
  const queryClient = new QueryClient();
  const limit = 6;
  const offset = 0;

  const cookieStore = cookies();
  const shopId = cookieStore.get('shopId')?.value;
  const userId = cookieStore.get('userId')?.value;
  const myType = cookieStore.get('myType')?.value;

  await queryClient.prefetchQuery({
    queryKey: ['noticeAll'],
    queryFn: () => FetchAllNotice({ offset, limit }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className=" flex-col min-h-screen">
        <div className=" flex-col min-h-[calc(100vh-126px)] md:min-h-[calc(100vh-100px)]">
          <NavigationBar shopId={shopId} userId={userId} myType={myType} />
          <div className="flex flex-col w-[100%]">
            <CustomNotice />
            <AllNotices />
          </div>
        </div>
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
