'use client';

import Button from '@/components/button/indext';
import Input from '@/components/input';
import { validateEmail, validatePassword } from '@/utils/validation';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

export default function SignInForm() {
  const [signinInfo, setSigninInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninInfo({
      ...signinInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signinInfo);
  };

  const isFormValid =
    signinInfo.email !== '' &&
    validateEmail(signinInfo.email) === '' &&
    signinInfo.password !== '' &&
    validatePassword(signinInfo.password);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center mb-10 w-[208px] h-[38px] md:w-[248px] md:h-[45px]">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" fill />
        </Link>
      </div>
      <form className="flex flex-col gap-7 mb-5" onSubmit={handleSubmit}>
        <div>
          <p className="mb-2">이메일</p>
          <Input variant="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <p className="mb-2">비밀번호</p>
          <Input variant="password" name="password" onChange={handleChange} />
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
