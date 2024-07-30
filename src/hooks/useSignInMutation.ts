import { useMutation, UseMutationResult } from '@tanstack/react-query';
import signIn from '@/apis/auth/signIn';

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  item: {
    token: string;
  };
}

const useSignIn = (): UseMutationResult<SignInResponse, Error, SignInData> => {
  return useMutation<SignInResponse, Error, SignInData>({
    mutationFn: signIn,
    onError: (error) => {
      console.error('로그인 오류:', error);
    },
  });
};

export default useSignIn;
