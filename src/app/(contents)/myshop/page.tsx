'use client';

import { useState } from 'react';
import MyShopInfo from '@/components/myShopInfo';

export default function myShop() {
  const [shop, setShop] = useState<boolean>(true);

  return (
    <div className="flex  px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[237px] lg:py-[60px] flex-col items-start gap-[8px]">
      <div className="flex-col w-[100%]">
        <span className="text-black font-bold text-[20px] md:text-[28px]">내 가게</span>
        {shop ? (
          <MyShopInfo />
        ) : (
          <div className="flex flex-col justify-center items-center rounded-[12px] border-gray20 border gap-[16px] md:gap-[24px] py-[60px]  px-[24px]">
            <span className=" self-stretch text-black text-[14px] md:text-[16px] text-center">
              내 가게를 소개하고 공고도 등록해 보세요.
            </span>
            <button
              type="button"
              className="flex w-[140px] h-[37px] md:w-[380px] md:h-[47px] justify-center items-center rounded-[6px] bg-[#EA3C12] px-[20px] py-[10px] md:px-[136px] md:py-[14px] text-white font-bold text-center text-[14px] md:text-[16px]"
            >
              가게 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
