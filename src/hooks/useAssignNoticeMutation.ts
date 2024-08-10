import { useMutation, UseMutationResult } from '@tanstack/react-query';
import assignNotice from '@/apis/assignNoticeInfo/assignNoticeInfo';
import { AssignNoticeInfoData, AssignNoticeResponse } from '@/types/assignNoticeInfoData';
import { useShopId } from '@/stores/storeUserInfo';

const useAssignNotice = (): UseMutationResult<
  AssignNoticeResponse,
  Error,
  AssignNoticeInfoData
> => {
  const { shopId } = useShopId();

  return useMutation<AssignNoticeResponse, Error, AssignNoticeInfoData>({
    mutationFn: (data: AssignNoticeInfoData) => assignNotice(shopId, data),
    onSuccess: () => {
      console.log('공고 등록 성공');
    },
    onError: (error) => {
      console.error('공고 등록 실패', error);
    },
  });
};

export default useAssignNotice;
