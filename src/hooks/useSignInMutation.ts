import { useMutation, UseMutationResult } from '@tanstack/react-query';
import signIn from '@/apis/auth/signIn';
import { SignInData } from '@/types/signInData';
import { SignInResponse } from '@/types/signInData';

const useSignIn = (): UseMutationResult<SignInResponse, Error, SignInData> => {
  return useMutation<SignInResponse, Error, SignInData>({
    mutationFn: signIn,
    onError: (error) => {
      console.error('로그인 오류:', error);
    },
  });
};

export default useSignIn;
