'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { validateEmail } from '@/utils/validation';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

interface UserInfoType {
  email: string;
  password: string;
  passwordVerify: string;
  memberType: string;
}

export default function SignUpForm() {
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: '',
    password: '',
    passwordVerify: '',
    memberType: '',
  });

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
      memberType: type,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userInfo);
  };

  const isFormValid =
    userInfo.email !== '' &&
    validateEmail(userInfo.email) === '' &&
    userInfo.password === userInfo.passwordVerify &&
    userInfo.memberType !== '';

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
          <p className="mb-2">비밀번호 확인</p>
          <Input
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
              className={`w-full h-[50px] border border-gray20 rounded-[30px] ${userInfo.memberType === 'employee' ? 'bg-primary text-white' : ''}`}
              onClick={() => handleMemberType('employee')}
            >
              알바님
            </button>
            <button
              type="button"
              className={`w-full h-[50px] border border-gray20 rounded-[30px] ${userInfo.memberType === 'owner' ? 'bg-primary text-white' : ''}`}
              onClick={() => handleMemberType('owner')}
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
