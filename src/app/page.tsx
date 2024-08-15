import CustomNotice from '@/components/customNotice';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import MyPost from '@/components/myPost';
import AllNotices from '@/components/allNotices';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['noticeAll'],
    queryFn: FetchAllNotice,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className=" flex-col min-h-screen">
        <div className=" flex-col min-h-[calc(100vh-126px)] md:min-h-[calc(100vh-100px)]">
          <NavigationBar />
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
