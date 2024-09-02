import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import assignNotice from '@/apis/assignNoticeInfo/assignNoticeInfo';
import { AssignNoticeInfoData, AssignNoticeResponse } from '@/types/assignNoticeInfoData';
import { useShopId } from '@/stores/storeUserInfo';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ErrorResponseData } from '@/types/errorResponseData';

interface AssignNoticeInfoVariables {
  assignNoticeInfo: AssignNoticeInfoData;
  token: string | undefined;
}

const useAssignNotice = (): UseMutationResult<
  AssignNoticeResponse,
  AxiosError,
  AssignNoticeInfoVariables
> => {
  const { shopId } = useShopId();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<AssignNoticeResponse, AxiosError, AssignNoticeInfoVariables>({
    mutationFn: ({ assignNoticeInfo, token }: AssignNoticeInfoVariables) =>
      assignNotice(shopId, assignNoticeInfo, token),
    onSuccess: () => {
      toast.success('공고 등록 성공');
      queryClient.invalidateQueries({ queryKey: ['myNotices', shopId] });
      router.push(`/myshop/${shopId}`);
    },
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data as ErrorResponseData;
        const errorMessage = errorData.message || '공고 편집 실패'; // 예: `errorData.message`가 정의된 경우 사용
        toast.error(`공고 등록 실패: ${errorMessage}`);
      } else {
        toast.error('공고 등록 실패: 네트워크 오류');
      }
      console.error('공고 등록 실패', error);
    },
  });
};

export default useAssignNotice;
