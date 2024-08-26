import { useMutation, UseMutationResult } from '@tanstack/react-query';
import signUp from '@/apis/auth/signUp';

interface SignUpData {
  email: string;
  password: string;
  type: string;
}

const useSignUp = (): UseMutationResult<unknown, Error, SignUpData> => {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      console.error('회원가입 오류:', error);
    },
  });
};

export default useSignUp;
