import assignProfile from '@/apis/assignProfileInfo/assignProfileInfo';
import { useUserId } from '@/stores/storeUserInfo';
import { AssignProfileInfoData, AssignProfileResponse } from '@/types/assignProfileInfoData';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useAssignProfile = (): UseMutationResult<
  AssignProfileResponse,
  Error,
  AssignProfileInfoData
> => {
  const { userId } = useUserId();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: AssignProfileInfoData) => assignProfile(userId, data),
    onSuccess: () => {
      console.log('프로필 수정 성공');
      router.push('/');
    },
    onError: (error) => {
      console.error('프로필 수정 실패', error);
    },
  });
};

export default useAssignProfile;
