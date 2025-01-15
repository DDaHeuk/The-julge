/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import Button from '@/components/commonComponents/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 w-full px-[20px] py-[10px] md:px-[32px] md:py-[15px] lg:px-[300px] border-b border-gray20 bg-white z-10"
        onClick={handleGoHome}
      >
        <Image
          src="images/logo.svg"
          alt="logo"
          width={108}
          height={20}
          className="cursor-pointer"
        />
      </div>

      <div className="flex flex-col justify-center items-center h-screen pt-[60px]">
        <div className="flex flex-col gap-3">
          <Image src="/images/logo.svg" alt="logo" width={300} height={300} />
          <div className="flex flex-col items-center">
            <h1 className="text-red30 text-[40px] font-bold">404 ERROR</h1>
            <h2 className="text-red30 font-bold">죄송합니다. 페이지를 찾을 수 없습니다.</h2>
          </div>
          <Button color="noFilled" className="w-[300px]" onClick={handleGoHome}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
