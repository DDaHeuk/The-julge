'use client';

import { useState } from 'react';
import MyShopInfo from '@/components/myShopInfo';
import NoticeAssignShop from '@/components/noticeAssignShop';
import NoticeAssignPost from '@/components/noticeAssignPost';
import MyPost from '@/components/myPost';
import { useSuspenseQuery } from '@tanstack/react-query';
import getShopDetail from '@/apis/shop/shopDetail';
import getMyNotices from '@/apis/notice/myNotice';

interface ShopDetailContainerProps {
  shopId?: string;
}

const ShopDetailContainer = ({ shopId }: ShopDetailContainerProps) => {
  const { data: myShopData } = shopId
    ? useSuspenseQuery({
        queryKey: ['shopDetail', shopId],
        queryFn: () => getShopDetail(shopId),
      })
    : { data: null }; // shopId가 없을 때 data는 null로 설정

  const { data: myNoticesData } = shopId
    ? useSuspenseQuery({
        queryKey: ['myNotices', shopId],
        queryFn: () => getMyNotices(shopId, 0, 6),
      })
    : { data: null }; // shopId가 없을 때 data는 null로 설정

  const [post] = useState<boolean>(true);

  return (
    <div className="flex flex-col">
      <div className="flex  px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[237px] lg:py-[60px] flex-col items-start gap-[8px]">
        <div className="flex-col w-[100%]">
          <span className="text-black font-bold text-[20px] md:text-[28px]">내 가게</span>
          {shopId && myShopData ? <MyShopInfo shopInfo={myShopData.item} /> : <NoticeAssignShop />}
        </div>
      </div>
      {shopId && (
        <div className="flex  px-[12px] pt-[40px] pb-[80px] md:px-[32px] md:pt-[60px] md:pb-[120px] lg:px-[237px]  flex-col items-start gap-[8px]">
          <div className="flex-col w-[100%] gap-[16px] md:gap-[32px]">
            <span className="text-black font-bold text-[20px] md:text-[28px]">
              {post ? '내가 등록한 공고' : '등록한 공고'}
            </span>
            {post ? <MyPost /> : <NoticeAssignPost />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDetailContainer;
