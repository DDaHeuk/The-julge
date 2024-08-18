'use client';

import Image from 'next/image';
import { useSuspenseQuery } from '@tanstack/react-query';
import fetchNoticeDetail from '@/apis/notice/noticeDetail';
import { formatWorkSchedule } from '@/utils/dateTimeFormat';
import formatCurrency from '@/utils/currencyFormat';
import Link from 'next/link';
import Button from '../button';
import HourlypayCalc from '../hourlypayCalc';

interface NoticeDetailContainerProps {
  memberType: 'owner' | 'employee';
  shopId: string;
  noticeId: string;
}

export default function NoticeDetailContainer({
  memberType,
  shopId,
  noticeId,
}: NoticeDetailContainerProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['noticeDetail', shopId, noticeId],
    queryFn: () => fetchNoticeDetail({ shopId, noticeId }),
  });
  const shopInfo = data?.item?.shop?.item;
  const noticeInfo = data?.item;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] md:gap-6 lg:px-[238px]">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-primary font-bold md:text-[16px]">
              {shopInfo?.category}
            </p>
            <h2 className="text-[20px] text-black font-bold md:text-[28px]">{shopInfo?.name}</h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between w-full p-5 bg-white rounded-[12px] md:p-6 lg:flex gap-6">
            <div
              className="relative overflow-hidden w-full h-[200px] lg:w-[60%] lg:h-[340px] rounded-[12px]"
              style={{
                backgroundImage: `url('${shopInfo?.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="flex flex-col gap-6 md:gap-10 lg:w-[40%]">
              <div className="flex flex-col gap-2 md:gap-3">
                <p className="text-[14px] text-primary font-bold md:text-[16px]">시급</p>
                <div className="flex gap-2">
                  <p className="text-[24px] text-black font-bold md:text-[28px]">
                    {formatCurrency(noticeInfo?.hourlyPay)}원
                  </p>
                  <HourlypayCalc
                    originalPay={shopInfo?.originalHourlyPay}
                    currentPay={noticeInfo?.hourlyPay}
                  />
                </div>

                <div className="flex gap-[6px]">
                  <Image src="/icons/clock.svg" alt="시계 아이콘" width={20} height={20} />
                  <p className="text-[14px] text-gray50 md:text-[16px]">
                    {formatWorkSchedule(noticeInfo?.startsAt, noticeInfo?.workhour)}
                  </p>
                </div>
                <div className="flex gap-[6px]">
                  <Image src="/icons/marker.svg" alt="마커 표시" width={20} height={20} />
                  <p className="text-[14px] text-gray50 md:text-[16px]">{shopInfo?.address1}</p>
                </div>
                <p className="text-[14px text-black md:text-[16px]">{shopInfo?.description}</p>
              </div>

              {memberType === 'owner' ? (
                <Link href={`/editnotice/${shopId}/${noticeId}`}>
                  <Button type="button" color="noFilled" className="w-full h-[38px] md:h-[48px]">
                    공고 편집하기
                  </Button>
                </Link>
              ) : (
                <Button type="button" color="filled" className="w-full h-[38px] md:h-[48px]">
                  신청하기
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5 bg-gray10 rounded-xl md:p-8">
          <p className="text-[14px] text-black font-bold md:text-[16px]">공고설명</p>
          <p className="text-[14px] text-black md:text-[16px]">{noticeInfo?.description}</p>
        </div>
      </div>
    </div>
  );
}
