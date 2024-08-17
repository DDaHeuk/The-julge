import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AssignNoticeInfoData, AssignNoticeResponse } from '@/types/assignNoticeInfoData';
import { useShopId } from '@/stores/storeUserInfo';
import { useRouter } from 'next/navigation';
import editNotice from '@/apis/editNoticeInfo/editNoticeInfo';

// shopId를 포함한 새로운 타입 정의
interface EditShopVariables {
  data: AssignNoticeInfoData;
  shopId: string;
  noticeId: string;
}

const useEditNotice = (): UseMutationResult<AssignNoticeResponse, Error, EditShopVariables> => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setShopId } = useShopId();
  return useMutation<AssignNoticeResponse, Error, EditShopVariables>({
    mutationFn: ({ data, shopId, noticeId }) => editNotice(data, shopId, noticeId),
    onSuccess: (data) => {
      console.log('가게 편집 성공');
      const shopId = data.item.id;
      setShopId(shopId);
      queryClient.invalidateQueries({ queryKey: ['shopDetail', shopId] });
      router.push(`/myshop/${shopId}`);
    },
    onError: (error) => {
      console.error('가게 편집 실패', error);
    },
  });
};

export default useEditNotice;
