import { useMutation, UseMutationResult } from '@tanstack/react-query';
import applicationProcess from '@/apis/notice/putApplicationProcess';

interface ApplicationData {
  applicationId: string;
  status: 'accepted' | 'rejected' | 'canceled';
  shopId: string;
  noticeId: string;
  token: string | undefined;
}

const useApplicationProcess = (): UseMutationResult<unknown, Error, ApplicationData> => {
  return useMutation({
    mutationFn: applicationProcess,
    onError: (error) => {
      console.error('신청자 상태 변경 중 오류', error);
    },
  });
};

export default useApplicationProcess;
