import getUserInfo from "@/apis/user/getUserInfo";
import ProfileDetailContainer from "@/components/profileDetailContainer";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface MyProfileProps {
  params: {
    userId: string;
  };
}

export default async function myProfile({ params }: MyProfileProps) {
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['profileDetail', params.userId],
    queryFn: () => getUserInfo(params.userId),
  });

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileDetailContainer userId={params.userId}/>
      </HydrationBoundary>
    </div>
  );
}
