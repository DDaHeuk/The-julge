import editProfile from '@/apis/editProfileInfo/editProfileInfo';
import { useUserId, useAddress } from '@/stores/storeUserInfo';
import { AssignProfileInfoData, AssignProfileResponse } from '@/types/assignProfileInfoData';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useEditProfile = (): UseMutationResult<
  AssignProfileResponse,
  Error,
  AssignProfileInfoData
> => {
  const { userId } = useUserId();
  const { setUserAddress } = useAddress();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: AssignProfileInfoData) => editProfile(userId, data),
    onSuccess: (data) => {
      console.log('프로필 수정 성공');
      setUserAddress(data.item.address);
      document.cookie = `address=${encodeURIComponent(data.item.address)}; path=/; max-age=${60 * 60 * 24}`;
      queryClient.invalidateQueries({ queryKey: ['profileDetail', userId] });
      queryClient.invalidateQueries({ queryKey: ['noticeCustom', data.item.address] });
      router.push(`/myprofile/${userId}`);
    },
    onError: (error) => {
      console.error('프로필 수정 실패', error);
    },
  });
};

export default useEditProfile;
