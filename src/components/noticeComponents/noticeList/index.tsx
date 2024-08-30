'use client';

import Image from 'next/image';
import formatCurrency from '@/utils/currencyFormat';
import { formatWorkSchedule } from '@/utils/dateTimeFormat';
import useRecentStore from '@/stores/storeRecentNotices';
import Link from 'next/link';
import HourlypayCalc from '../../commonComponents/hourlypayCalc';

interface ShopItem {
  id: string;
  name: string;
  imageUrl?: string;
  address1: string;
  originalHourlyPay: number;
}

interface NoticeItem {
  id: string;
  closed: boolean;
  startsAt: string;
  workhour: number;
  hourlyPay: number;
  shop: {
    item: ShopItem;
  };
}

interface NoticeData {
  item: NoticeItem;
}

export default function NoticeList({ noticeData }: { noticeData: NoticeData }) {
  const { addNotice } = useRecentStore();
  const processedData = noticeData.item;
  const processedShopData = processedData.shop.item;
  const handleClick = () => {
    addNotice(noticeData);
  };

  return (
    <Link href={`/shop/${processedShopData.id}/notice/${processedData.id}`} onClick={handleClick}>
      <div className="flex p-[12px] md:p-[16px] flex-col items-start gap-[12px] md:gap-[20px] rounded-[12px] border border-gray20 bg-white">
        <div
          style={{
            backgroundImage: `url('${processedShopData?.imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="relative flex justify-center items-center rounded-[12px] w-[100%] h-[171px] lg:h-[160px]"
        >
          {processedData.closed && (
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
              className={`${processedData.closed ? 'text-gray30' : 'text-black'} text-[16px] md:text-[20px] font-bold`}
            >
              {processedShopData?.name}
            </span>
            <div className="flex items-start gap-[6px] self-stretch">
              <Image
                className="md:w-[20px] md:h-[20px]"
                src={processedData?.closed ? '/icons/clock-inactive.svg' : '/icons/clock.svg'}
                alt="시계 아이콘"
                width={16}
                height={16}
              />
              <div className="flex flex-col md:flex-row md:gap-[7px]">
                <span
                  className={`${processedData?.closed ? 'text-gray30' : 'text-gray50'} text-[12px] md:text-[14px] `}
                >
                  {formatWorkSchedule(processedData?.startsAt, processedData?.workhour)}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <Image
                className="md:w-[20px] md:h-[20px]"
                src={processedData?.closed ? '/icons/marker-inactive.svg' : '/icons/marker.svg'}
                alt="마커 아이콘"
                width={16}
                height={16}
              />
              <span
                className={`${processedData?.closed ? 'text-gray30' : 'text-gray50'} text-[12px] md:text-[14px] `}
              >
                {processedShopData?.address1}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-0 md:flex-row md:justify-between items-start self-stretch">
            <span
              className={`${processedData?.closed ? 'text-gray30' : 'text-black'} text-[18px] md:text-[24px] font-bold`}
            >
              {formatCurrency(processedData?.hourlyPay)}원
            </span>
            <HourlypayCalc
              originalPay={processedShopData?.originalHourlyPay}
              currentPay={processedData?.hourlyPay}
              deadline={processedData?.closed}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
