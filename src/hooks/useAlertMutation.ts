import { useMutation, UseMutationResult } from '@tanstack/react-query';
import readAlert from '@/apis/alert/putAlert';

interface AlertData {
  userId: string;
  alertId: string;
  token: string | undefined;
}

const useAlertMutation = (): UseMutationResult<unknown, Error, AlertData> => {
  return useMutation({
    mutationFn: readAlert,
    onError: (error) => {
      console.error('알림 읽기 중 오류', error);
    },
  });
};

export default useAlertMutation;
