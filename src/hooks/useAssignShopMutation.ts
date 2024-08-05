import { useMutation } from '@tanstack/react-query';
import assignShop from '@/apis/assignShopInfo/assignShopInfo';

const useAssignShop = () => {
  return useMutation({
    mutationFn: assignShop,
    onSuccess: () => {
      console.log('가게 등록 성공');
    },
    onError: (error) => {
      console.error('가게 등록 실패', error);
    },
  });
};

export default useAssignShop;
