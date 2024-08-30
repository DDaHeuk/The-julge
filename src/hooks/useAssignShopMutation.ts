import { useMutation, UseMutationResult } from '@tanstack/react-query';
import assignShop from '@/apis/assignShopInfo/assignShopInfo';
import { AssignShopInfoData, AssignShopResponse } from '@/types/assignShopInfoData';
import { useShopId } from '@/stores/storeUserInfo';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ErrorResponseData } from '@/types/errorResponseData';

interface AssignShopInfoVariables {
  assignShopInfo: AssignShopInfoData;
  token: string | undefined;
}

const useAssignShop = (): UseMutationResult<
  AssignShopResponse,
  AxiosError,
  AssignShopInfoVariables
> => {
  const router = useRouter();
  const { setShopId } = useShopId();
  return useMutation<AssignShopResponse, AxiosError, AssignShopInfoVariables>({
    mutationFn: ({ assignShopInfo, token }) => assignShop({ assignShopInfo, token }),
    onSuccess: (data) => {
      toast.success('가게 등록 성공');
      const shopId = data.item.id;
      setShopId(shopId);
      router.push(`/myshop/${shopId}`);
    },
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data as ErrorResponseData;
        const errorMessage = errorData.message || '가게 등록 실패'; // 예: `errorData.message`가 정의된 경우 사용
        toast.error(`가게 등록 실패: ${errorMessage}`);
      } else {
        toast.error('가게 등록 실패: 네트워크 오류');
      }
      console.error('가게 등록 실패', error);
    },
  });
};

export default useAssignShop;
