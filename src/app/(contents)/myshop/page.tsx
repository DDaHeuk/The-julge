'use client';

import { useState } from 'react';
import MyShopInfo from '@/components/myShopInfo';
import NoticeAssignShop from '@/components/noticeAssignShop';
import NoticeAssignPost from '@/components/noticeAssignPost';

export default function myShop() {
  const [shop, setShop] = useState<boolean>(true);
  const [post, setPost] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div className="flex  px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[237px] lg:py-[60px] flex-col items-start gap-[8px]">
        <div className="flex-col w-[100%]">
          <span className="text-black font-bold text-[20px] md:text-[28px]">내 가게</span>
          {shop ? <MyShopInfo /> : <NoticeAssignShop />}
        </div>
      </div>
      <div className="flex  px-[12px] pt-[40px] pb-[80px] md:px-[32px] md:pt-[60px] md:pb-[120px] lg:px-[237px]  flex-col items-start gap-[8px]">
        <div className="flex-col w-[100%]">
          <span className="text-black font-bold text-[20px] md:text-[28px]">등록한 공고</span>
          {post ? <MyShopInfo /> : <NoticeAssignPost />}
        </div>
      </div>
    </div>
  );
}
