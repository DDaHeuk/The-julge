import editProfile from '@/apis/editProfileInfo/editProfileInfo';
import { useUserId } from '@/stores/storeUserInfo';
import { AssignProfileInfoData, AssignProfileResponse } from '@/types/assignProfileInfoData';
import { ErrorResponseData } from '@/types/errorResponseData';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const useEditProfile = (): UseMutationResult<
  AssignProfileResponse,
  AxiosError,
  AssignProfileInfoData
> => {
  const { userId } = useUserId();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: AssignProfileInfoData) => editProfile(userId, data),
    onSuccess: () => {
      toast.success('프로필 편집 성공');
      queryClient.invalidateQueries({ queryKey: ['profileDetail', userId] });
      router.push(`/myprofile/${userId}`);
    },
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data as ErrorResponseData;
        const errorMessage = errorData.message || '프로필 편집 실패'; // 예: `errorData.message`가 정의된 경우 사용
        toast.error(`프로필 편집 실패 : ${errorMessage}`);
      } else {
        toast.error(`프로필 편집 실패 : 네트워크 오류`);
      }
      console.error('프로필 편집 실패', error);
    },
  });
};

export default useEditProfile;
