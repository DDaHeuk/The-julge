'use client';

import Button from '@/components/commonComponents/button';
import Input from '@/components/commonComponents/input';
import useSignUp from '@/hooks/useSignUpMutation';
import SignForm from '@/types/signForm';
import { ErrorResponseData } from '@/types/errorResponseData';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignForm>();

  const { mutate: signUp } = useSignUp();
  const router = useRouter();

  const handleMemberType = (type: string) => {
    setValue('type', type);
  };

  const onSubmit: SubmitHandler<SignForm> = (data) => {
    if (!data.type) {
      toast.error('회원 유형을 선택해 주세요.');
      return;
    }

    signUp(
      {
        email: data.email,
        password: data.password,
        type: data.type,
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

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center mb-10 w-[208px] h-[38px] md:w-[248px] md:h-[45px]">
        <Link href="/">
          <Image src="/images/logo.svg" alt="logo" fill />
        </Link>
      </div>
      <form className="flex flex-col gap-7 mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            register={register}
            error={errors.email}
            label="이메일"
            variant="email"
            variant2="email"
            name="email"
          />
        </div>
        <div>
          <Input
            register={register}
            error={errors.password}
            label="비밀번호"
            variant="password"
            variant2="password"
            name="password"
          />
        </div>
        <div>
          <Input
            register={register}
            error={errors.passwordVerify}
            label="비밀번호 확인"
            variant="passwordVerify"
            variant2="passwordVerify"
            originalPassword={watch('password')}
            name="passwordVerify"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="mb-2">회원 유형</p>
          <div className="flex justify-between gap-4 w-full">
            <button
              type="button"
              className={`w-full h-[50px] border border-gray20 rounded-[30px] ${watch('type') === 'employee' ? 'bg-primary text-white' : ''}`}
              onClick={() => handleMemberType('employee')}
            >
              알바님
            </button>
            <button
              type="button"
              className={`w-full h-[50px] border border-gray20 rounded-[30px] ${watch('type') === 'employer' ? 'bg-primary text-white' : ''}`}
              onClick={() => handleMemberType('employer')}
            >
              사장님
            </button>
          </div>
        </div>
        <div>
          <Button type="submit" color="filled" className="w-[350px]">
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
