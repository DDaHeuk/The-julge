import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { EditNoticeInfoData, EditNoticeResponse } from '@/types/editNoticeInfoData';
import { useRouter } from 'next/navigation';
import editNotice from '@/apis/editNoticeInfo/editNoticeInfo';
import { toast } from 'sonner';

// shopId를 포함한 새로운 타입 정의
interface EditShopVariables {
  data: EditNoticeInfoData;
  shopId: string;
  noticeId: string;
}

const useEditNotice = (): UseMutationResult<EditNoticeResponse, Error, EditShopVariables> => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<EditNoticeResponse, Error, EditShopVariables>({
    mutationFn: ({ data, shopId, noticeId }) => editNotice(data, shopId, noticeId),
    onSuccess: (data) => {
      toast.success('공고 편집 성공');
      queryClient.invalidateQueries({ queryKey: ['noticeDetail'] });
      router.push(`/myshop/${data.item.shop.item.id}/notices/${data.item.id}`);
    },
    onError: (error) => {
      console.error('공고 편집 실패', error);
    },
  });
};

export default useEditNotice;
