import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AssignShopInfoData, AssignShopResponse } from '@/types/assignShopInfoData';
import { useShopId } from '@/stores/storeUserInfo';
import { useRouter } from 'next/navigation';
import editShop from '@/apis/editShopInfo/editShopInfo';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ErrorResponseData } from '@/types/errorResponseData';

// shopId를 포함한 새로운 타입 정의
interface EditShopVariables {
  data: AssignShopInfoData;
  shopId: string;
}

const useEditShop = (): UseMutationResult<AssignShopResponse, AxiosError, EditShopVariables> => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setShopId } = useShopId();
  return useMutation<AssignShopResponse, AxiosError, EditShopVariables>({
    mutationFn: ({ data, shopId }) => editShop(data, shopId),
    onSuccess: (data) => {
      toast.success('가게 편집 성공');
      const shopId = data.item.id;
      setShopId(shopId);
      queryClient.invalidateQueries({ queryKey: ['shopDetail', shopId] });
      router.push(`/myshop/${shopId}`);
    },
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data as ErrorResponseData;
        const errorMessage = errorData.message || '가게 편집 실패'; // 예: `errorData.message`가 정의된 경우 사용
        toast.error(`가게 편집 실패: ${errorMessage}`);
      } else {
        toast.error('가게 편집 실패: 네트워크 오류');
      }
      console.error('가게 편집 실패', error);
    },
  });
};

export default useEditShop;
