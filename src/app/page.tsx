import CustomNotice from '@/components/homeComponents/customNotice';
import Footer from '@/components/commonComponents/footer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import AllNotices from '@/components/homeComponents/allNotices';
import NavigationBar from '@/components/commonComponents/navigationBar';
// import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function Home() {
  const queryClient = new QueryClient();
  const limit = 6;
  const offset = 0;

  await queryClient.prefetchQuery({
    queryKey: ['noticeAll'],
    queryFn: () => FetchAllNotice({ offset, limit }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className=" flex-col min-h-screen">
        <div className=" flex-col min-h-[calc(100vh-126px)] md:min-h-[calc(100vh-100px)]">
          <Suspense>
            <NavigationBar />
          </Suspense>
          <div className="flex flex-col w-[100%]">
            <Suspense>
              <CustomNotice />
              <AllNotices />
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
