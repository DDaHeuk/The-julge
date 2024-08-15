import { useMutation, UseMutationResult } from '@tanstack/react-query';
import assignShop from '@/apis/assignShopInfo/assignShopInfo';
import { AssignShopInfoData, AssignShopResponse } from '@/types/assignShopInfoData';
import { useShopId } from '@/stores/storeUserInfo';
import { useRouter } from 'next/navigation';

const useAssignShop = (): UseMutationResult<AssignShopResponse, Error, AssignShopInfoData> => {
  const router = useRouter();
  const { setShopId } = useShopId();
  return useMutation<AssignShopResponse, Error, AssignShopInfoData>({
    mutationFn: assignShop,
    onSuccess: (data) => {
      console.log('가게 등록 성공');
      const shopId = data.item.id;
      setShopId(shopId);
      router.push(`/myshop/${shopId}`);
    },
    onError: (error) => {
      console.error('가게 등록 실패', error);
    },
  });
};

export default useAssignShop;
