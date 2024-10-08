import applyNotice from '@/apis/notice/applyNotice';
import { useUserId } from '@/stores/storeUserInfo';
import { ErrorResponseData } from '@/types/errorResponseData';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ApplyNoticeData {
  shopId: string;
  noticeId: string;
  token: string | undefined;
}

interface ApplyNoticeResponse {
  item: {
    id: string;
    status: string;
    user: {
      item: {
        id: string;
        email: string;
        type: string;
        name: string;
        phone: string;
        address: string;
        bio: string;
      };
    };
  };
}

const useApplyNotice = (): UseMutationResult<ApplyNoticeResponse, AxiosError, ApplyNoticeData> => {
  const router = useRouter();
  const { userId } = useUserId();
  return useMutation({
    mutationFn: ({ shopId, noticeId, token }: ApplyNoticeData) =>
      applyNotice({ shopId, noticeId, token }),
    onSuccess: () => {
      toast.success('공고 신청 성공');
      router.refresh();
    },
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data as ErrorResponseData;
        const errorMessage = errorData.message || '공고 신청 실패'; // 예: `errorData.message`가 정의된 경우 사용
        toast.error(`공고 신청 실패 : ${errorMessage}`);
      } else if (!userId) {
        toast.error('공고 신청 실패 : 로그인을 먼저 해주세요.');
        router.push('/signin');
      } else {
        console.error('공고 신청 실패', error);
      }
    },
  });
};

export default useApplyNotice;
