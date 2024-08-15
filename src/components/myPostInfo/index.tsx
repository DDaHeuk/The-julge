'use client';

import { NoticeData } from '@/types/myNoticeData';
import { useQueryClient } from '@tanstack/react-query';
import { ShopDetailData } from '@/types/shopDetailData';
import Image from 'next/image';

interface MyPostInfoProps {
  noticeData: NoticeData;
  deadline: boolean;
  shopId: string;
}

const MyPostInfo: React.FC<MyPostInfoProps> = ({
  noticeData,
  deadline,
  shopId,
}: MyPostInfoProps) => {
  const queryClient = useQueryClient();
  const cachedShopData = queryClient.getQueryData(['shopDetail', shopId]) as ShopDetailData;

  return (
    <div className="flex p-[12px] md:p-[16px] flex-col items-start gap-[12px] md:gap-[20px] rounded-[12px] border border-gray20">
      <div
        style={{
          backgroundImage: `url('${cachedShopData?.item.imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative -z-10 flex justify-center items-center rounded-[12px] w-[100%] h-[171px] lg:h-[160px]"
      >
        {deadline && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[12px]">
            <span className="text-gray30 text-center font-bold text-[20px] md:text-[28px]">
              마감 완료
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-start gap-[16px] self-stretch">
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          <span
            className={`${deadline ? 'text-gray30' : 'text-black'} text-[16px] md:text-[20px] font-bold`}
          >
            {cachedShopData?.item.name}
          </span>
          <div className="flex items-start gap-[6px] self-stretch">
            <Image
              className="md:w-[20px] md:h-[20px]"
              src={deadline ? '/icons/clock-inactive.svg' : '/icons/clock.svg'}
              alt="시계 아이콘"
              width={16}
              height={16}
            />
            <div className="flex flex-col md:flex-row md:gap-[7px]">
              <span
                className={`${deadline ? 'text-gray30' : 'text-gray50'} text-[12px] md:text-[14px] `}
              >
                2023-06-02
              </span>
              <span
                className={` ${deadline ? 'text-gray30' : 'text-gray50'} text-[12px] md:text-[14px]`}
              >
                15:00~18:00 (3시간)
              </span>
            </div>
          </div>
          <div className="flex items-start gap-[6px]">
            <Image
              className="md:w-[20px] md:h-[20px]"
              src={deadline ? '/icons/marker-inactive.svg' : '/icons/marker.svg'}
              alt="마커 아이콘"
              width={16}
              height={16}
            />
            <span
              className={`${deadline ? 'text-gray30' : 'text-gray50'} text-[12px] md:text-[14px] `}
            >
              {cachedShopData?.item.address1}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-start self-stretch">
          <span
            className={`${deadline ? 'text-gray30' : 'text-black'} text-[18px] md:text-[24px] font-bold`}
          >
            {noticeData?.hourlyPay}
          </span>
          <div className="flex md:hidden items-center gap-[2px]">
            <span className={`${deadline ? 'text-gray30' : 'text-red40'} text-center text-[12px]`}>
              기존 시급보다 50%️️
            </span>
            <Image
              src={deadline ? '/icons/arrow-up-inactive.svg' : '/icons/arrow-up.svg'}
              alt="화살표 아이콘"
              width={16}
              height={16}
            />
          </div>
          <div
            className={`hidden ${deadline ? 'hidden' : 'md:flex'} items-center justify-center rounded-[20px] bg-red40 h-[36px] w-[159px]`}
          >
            <div className="flex items-center  gap-[2px]">
              <span className="text-white text-center text-[14px] font-bold">
                기존 시급보다 50%️️
              </span>
              <Image src="/icons/arrow-up-white.svg" alt="화살표 아이콘" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPostInfo;
