import editProfile from '@/apis/editProfileInfo/editProfileInfo';
import { useUserId, useAddress } from '@/stores/storeUserInfo';
import { AssignProfileInfoData, AssignProfileResponse } from '@/types/assignProfileInfoData';
import { ErrorResponseData } from '@/types/errorResponseData';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AssignProfileInfoVariables {
  data: AssignProfileInfoData;
  token: string | undefined;
}

const useEditProfile = (): UseMutationResult<
  AssignProfileResponse,
  AxiosError,
  AssignProfileInfoVariables
> => {
  const { userId } = useUserId();
  const { setUserAddress } = useAddress();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ data, token }: AssignProfileInfoVariables) => editProfile(userId, data, token),
    onSuccess: (data) => {
      toast.success('프로필 편집 성공');
      setUserAddress(data.item.address);
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
