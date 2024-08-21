import getUserApplications from '@/apis/user/getUserApplications';
import getUserInfo from '@/apis/user/getUserInfo';
import ProfileDetailContainer from '@/components/profileDetailContainer';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

interface MyProfileProps {
  params: {
    userId: string;
  };
}

export default async function myProfile({ params }: MyProfileProps) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const queryClient = new QueryClient();

  const { userId } = params;
  const limit = 5;
  const initialOffset = 0;

  await queryClient.prefetchQuery({
    queryKey: ['profileDetail', userId],
    queryFn: () => getUserInfo(userId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['myApplications'],
    queryFn: () => getUserApplications({ userId, offset: initialOffset, limit, token }),
  });

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileDetailContainer userId={userId} token={token} />
      </HydrationBoundary>
    </div>
  );
}
