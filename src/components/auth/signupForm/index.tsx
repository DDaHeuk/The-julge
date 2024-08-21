'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import useSignUp from '@/hooks/useSignUpMutation';
import { ErrorResponseData } from '@/types/errorResponseData';
import { validateEmail } from '@/utils/validation';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UserInfoType {
  email: string;
  password: string;
  passwordVerify: string;
  type: string;
}

export default function SignUpForm() {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: '',
    password: '',
    passwordVerify: '',
    type: '',
  });

  const { mutate: signUp } = useSignUp();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleMemberType = (type: string) => {
    setUserInfo({
      ...userInfo,
      type,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(
      {
        email: userInfo.email,
        password: userInfo.password,
        type: userInfo.type,
      },
      {
        onSuccess: () => {
          toast.success('회원가입 성공');
          router.push('/signin');
        },
        onError: (error: unknown) => {
          let errorMessage = '회원가입 실패';

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
    userInfo.email !== '' &&
    validateEmail(userInfo.email) === '' &&
    userInfo.password === userInfo.passwordVerify &&
    userInfo.type !== '';

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      router.push('/');
    }
  }, [router]);

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
          <Input
            label="비밀번호 확인"
            variant="passwordVerify"
            originalPassword={userInfo.password}
            name="passwordVerify"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="mb-2">회원 유형</p>
          <div className="flex justify-between gap-4 w-full">
            <button
              type="button"
              className={`w-full h-[50px] border border-gray20 rounded-[30px] ${userInfo.type === 'employee' ? 'bg-primary text-white' : ''}`}
              onClick={() => handleMemberType('employee')}
            >
              알바님
            </button>
            <button
              type="button"
              className={`w-full h-[50px] border border-gray20 rounded-[30px] ${userInfo.type === 'employer' ? 'bg-primary text-white' : ''}`}
              onClick={() => handleMemberType('employer')}
            >
              사장님
            </button>
          </div>
        </div>
        <div>
          <Button type="submit" color="filled" disabled={!isFormValid} className="w-[350px]">
            가입하기
          </Button>
        </div>
      </form>
      <p>
        이미 가입하셨나요?{' '}
        <span className="text-violet underline">
          <Link href="/signin">로그인하기</Link>
        </span>
      </p>
    </div>
  );
}
