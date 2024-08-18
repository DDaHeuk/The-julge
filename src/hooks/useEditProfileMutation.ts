import editProfile from '@/apis/editProfileInfo/editProfileInfo';
import { useUserId } from '@/stores/storeUserInfo';
import { AssignProfileInfoData, AssignProfileResponse } from '@/types/assignProfileInfoData';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useEditProfile = (): UseMutationResult<
  AssignProfileResponse,
  Error,
  AssignProfileInfoData
> => {
  const { userId } = useUserId();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: AssignProfileInfoData) => editProfile(userId, data),
    onSuccess: () => {
      console.log('프로필 수정 성공');
      queryClient.invalidateQueries({ queryKey: ['profileDetail', userId] });
      router.push(`/myprofile/${userId}`);
    },
    onError: (error) => {
      console.error('프로필 수정 실패', error);
    },
  });
};

export default useEditProfile;
