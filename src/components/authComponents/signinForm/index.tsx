'use client';

import useSignIn from '@/hooks/useSignInMutation';
import { validateEmail, validatePassword } from '@/utils/validation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { SignInData } from '@/types/signInData';
import {
  useMyType,
  useUserId,
  useShopId,
  useAddress,
  useApplication,
} from '@/stores/storeUserInfo';
import getUserInfo from '@/apis/user/getUserInfo';
import { toast } from 'sonner';
import { ErrorResponseData } from '@/types/errorResponseData';
import { AxiosError } from 'axios';
import getUserApplications from '@/apis/user/getUserApplications';
import Input from '@/components/commonComponents/input';
import Button from '@/components/commonComponents/button';

interface ApplicationItem {
  item: {
    id: string;
    status: string;
  };
}

export default function SignInForm() {
  const [signinInfo, setSigninInfo] = useState<SignInData>({
    email: '',
    password: '',
  });

  const { mutate: signIn } = useSignIn();

  const { setMyType } = useMyType();
  const { setUserId } = useUserId();
  const { setShopId } = useShopId();
  const { setUserAddress } = useAddress();
  const { setUserApplication } = useApplication();

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninInfo({
      ...signinInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(
      {
        email: signinInfo.email,
        password: signinInfo.password,
      },
      {
        onSuccess: async (data) => {
          toast.success('로그인 성공');
          const userId = data.item.user.item.id;
          const { type } = data.item.user.item;
          document.cookie = `token=${data.item.token}; path=/; max-age=${60 * 60 * 24}`;
          const { token } = data.item;
          setUserId(userId);
          setMyType(type);
          setUserAddress(data.item.user.item.address);
          document.cookie = `userId=${userId}; path=/; max-age=${60 * 60 * 24}`;
          document.cookie = `myType=${type}; path=/; max-age=${60 * 60 * 24}`;
          // 사장님인 경우에만 내 정보 조회 후 shop Id를 저장
          if (type === 'employer') {
            try {
              const response = await getUserInfo(userId);
              setShopId(response.item.shop.item.id);

              document.cookie = `shopId=${response.item.shop.item.id}; path=/; max-age=${60 * 60 * 24}`;
              document.cookie = `token=${data.item.token}; path=/; max-age=${60 * 60 * 24}`;
            } catch (error) {
              console.error('Failed to fetch user info:', error);
            }
          } else {
            try {
              const offset = 0;
              const limit = 100;
              const response = await getUserApplications({ userId, offset, limit, token });
              const pendingApplicationIds = response.items
                .filter((item: ApplicationItem) => item.item.status === 'pending')
                .map((item: ApplicationItem) => item.item.id);
              setUserApplication(pendingApplicationIds);
            } catch (error) {
              console.error(error);
            }
          }
          router.push('/');
        },
        onError: (error: unknown) => {
          let errorMessage = '로그인 실패';

          if (error instanceof AxiosError) {
            const errorResponse = error.response?.data as ErrorResponseData;

            if (errorResponse && errorResponse.message) {
              errorMessage += `: ${errorResponse.message}`;
            }
          }

          toast.error(errorMessage);
        },
      },
    );
  };

  const isFormValid =
    signinInfo.email !== '' &&
    validateEmail(signinInfo.email) === '' &&
    signinInfo.password !== '' &&
    validatePassword(signinInfo.password) === '';

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center mb-10 w-[208px] h-[38px] md:w-[248px] md:h-[45px]">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" fill />
        </Link>
      </div>
      <form className="flex flex-col gap-7 mb-5" onSubmit={handleSubmit}>
        <div>
          <Input label="이메일" variant="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <Input label="비밀번호" variant="password" name="password" onChange={handleChange} />
        </div>
        <div>
          <Button color="filled" type="submit" className="w-[350px]" disabled={!isFormValid}>
            로그인 하기
          </Button>
        </div>
      </form>
      <p>
        회원이 아니신가요?{' '}
        <span className="text-violet underline">
          <Link href="/signup">회원가입하기</Link>
        </span>
      </p>
    </div>
  );
}
