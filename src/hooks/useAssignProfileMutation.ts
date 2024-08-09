import assignProfile from '@/apis/assignProfileInfo/assignProfileInfo';
import { useMutation } from '@tanstack/react-query';

const useAssignProfile = () => {
  return useMutation({
    mutationFn: assignProfile,
    onSuccess: () => {
      console.log('가게 등록 성공');
    },
    onError: (error) => {
      console.error('가게 등록 실패', error);
    },
  });
};

export default useAssignProfile;
