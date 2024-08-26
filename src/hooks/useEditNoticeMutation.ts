import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { EditNoticeInfoData, EditNoticeResponse } from '@/types/editNoticeInfoData';
import { ErrorResponseData } from '@/types/errorResponseData';
import { useRouter } from 'next/navigation';
import editNotice from '@/apis/editNoticeInfo/editNoticeInfo';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

// shopId를 포함한 새로운 타입 정의
interface EditShopVariables {
  data: EditNoticeInfoData;
  shopId: string;
  noticeId: string;
}

const useEditNotice = (): UseMutationResult<EditNoticeResponse, AxiosError, EditShopVariables> => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<EditNoticeResponse, AxiosError, EditShopVariables>({
    mutationFn: ({ data, shopId, noticeId }) => editNotice(data, shopId, noticeId),
    onSuccess: (data) => {
      toast.success('공고 편집 성공');
      queryClient.invalidateQueries({ queryKey: ['noticeDetail'] });
      router.push(`/myshop/${data.item.shop.item.id}/notices/${data.item.id}`);
    },
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data as ErrorResponseData;
        const errorMessage = errorData.message || '공고 편집 실패'; // 예: `errorData.message`가 정의된 경우 사용
        toast.error(`공고 편집 실패: ${errorMessage}`);
      } else {
        toast.error('공고 편집 실패: 네트워크 오류');
      }
      console.error('공고 편집 실패', error);
    },
  });
};

export default useEditNotice;
