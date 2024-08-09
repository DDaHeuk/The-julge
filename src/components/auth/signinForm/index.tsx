'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import useSignIn from '@/hooks/useSignInMutation';
import { validateEmail, validatePassword } from '@/utils/validation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { SignInData } from '@/types/signInData';

export default function SignInForm() {
  const [signinInfo, setSigninInfo] = useState<SignInData>({
    email: '',
    password: '',
  });

  const { mutate: signIn } = useSignIn();
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
        onSuccess: (data) => {
          const userId = data.item.user.item.id;
          localStorage.setItem('token', data.item.token);
          localStorage.setItem('userId', userId);
          router.push('/');
        },
      },
    );
  };

  const isFormValid =
    signinInfo.email !== '' &&
    validateEmail(signinInfo.email) === '' &&
    signinInfo.password !== '' &&
    validatePassword(signinInfo.password) === '';

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
