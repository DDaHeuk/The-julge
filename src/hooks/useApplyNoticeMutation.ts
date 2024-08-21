import applyNotice from '@/apis/notice/applyNotice';
import { ErrorResponseData } from '@/types/errorResponseData';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ApplyNoticeData {
  shopId: string;
  noticeId: string;
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
  return useMutation({
    mutationFn: ({ shopId, noticeId }: ApplyNoticeData) => applyNotice({ shopId, noticeId }),
    onSuccess: () => {
      toast.success('공고 신청 성공');
      setTimeout(() => {
        router.back();
      }, 800);
    },
    onError: (error) => {
      if (error.response) {
        const errorData = error.response.data as ErrorResponseData;
        const errorMessage = errorData.message || '프로필 편집 실패'; // 예: `errorData.message`가 정의된 경우 사용
        toast.error(`공고 신청 실패 : ${errorMessage}`);
      } else {
        toast.error(`공고 신청 실패 : 네트워크 오류`);
      }
      console.error('공고 신청 실패', error);
    },
  });
};

export default useApplyNotice;
