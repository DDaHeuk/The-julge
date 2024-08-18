import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AssignShopInfoData, AssignShopResponse } from '@/types/assignShopInfoData';
import { useShopId } from '@/stores/storeUserInfo';
import { useRouter } from 'next/navigation';
import editShop from '@/apis/editShopInfo/editShopInfo';

// shopId를 포함한 새로운 타입 정의
interface EditShopVariables {
  data: AssignShopInfoData;
  shopId: string;
}

const useEditShop = (): UseMutationResult<AssignShopResponse, Error, EditShopVariables> => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setShopId } = useShopId();
  return useMutation<AssignShopResponse, Error, EditShopVariables>({
    mutationFn: ({ data, shopId }) => editShop(data, shopId),
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

export default useEditShop;
