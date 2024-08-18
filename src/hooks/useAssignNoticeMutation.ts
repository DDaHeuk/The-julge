import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import assignNotice from '@/apis/assignNoticeInfo/assignNoticeInfo';
import { AssignNoticeInfoData, AssignNoticeResponse } from '@/types/assignNoticeInfoData';
import { useShopId } from '@/stores/storeUserInfo';
import { useRouter } from 'next/navigation';

const useAssignNotice = (): UseMutationResult<
  AssignNoticeResponse,
  Error,
  AssignNoticeInfoData
> => {
  const { shopId } = useShopId();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<AssignNoticeResponse, Error, AssignNoticeInfoData>({
    mutationFn: (data: AssignNoticeInfoData) => assignNotice(shopId, data),
    onSuccess: () => {
      console.log('공고 등록 성공');
      queryClient.invalidateQueries({ queryKey: ['myNotices', shopId] });
      router.push(`/myshop/${shopId}`);
    },
    onError: (error) => {
      console.error('공고 등록 실패', error);
    },
  });
};

export default useAssignNotice;
