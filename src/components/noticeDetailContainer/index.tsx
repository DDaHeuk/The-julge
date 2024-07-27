import Image from 'next/image';
import Button from '../button';

interface NoticeDetailContainerProps {
  children: React.ReactNode;
  memberType: 'owner' | 'employee';
}

export default function NoticeDetailContainer({
  children,
  memberType,
}: NoticeDetailContainerProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] md:gap-6 lg:px-[238px]">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-primary font-bold md:text-[16px]">식당</p>
            <h2 className="text-[20px] text-black font-bold md:text-[28px]">도토리 식당</h2>
          </div>

          <div className="w-full p-5 bg-white rounded-[12px] md:p-6 lg:flex">
            <div className="relative overflow-hidden w-full h-[200px]">
              <Image src="/icons/marker.svg" alt="공고이미지" fill />
            </div>
            <div className="flex flex-col gap-6 md:gap-10">
              <div className="flex flex-col gap-2 md:gap-3">
                <p className="text-[14px] text-primary font-bold md:text-[16px]">시급</p>
                <p className="text-[24px] text-black font-bold md:text-[28px]">15,000원</p>
                <div className="flex gap-[6px]">
                  <Image src="/icons/clock.svg" alt="시계 아이콘" width={20} height={20} />
                  <p className="text-[14px] text-gray50 md:text-[16px]">2000.00.00 15:00-18:00</p>
                </div>
                <div className="flex gap-[6px]">
                  <Image src="/icons/marker.svg" alt="마커 표시" width={20} height={20} />
                  <p className="text-[14px] text-gray50 md:text-[16px]">서울시 송파구</p>
                </div>
                <p className="text-[14px text-black md:text-[16px]">
                  알바하기 편한 너구리네 라면집! 라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는
                  가게입니다.
                </p>
              </div>

              {memberType === 'owner' ? (
                <Button type="button" color="noFilled" className="w-full h-[38px] md:h-[48px]">
                  공고 편집하기
                </Button>
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
          <p className="text-[14px] text-black md:text-[16px]">
            기존 알바 친구가 그만둬서 새로운 친구를 구했는데, 그 사이에 하루가 비네요. 급해서 시급도
            높였고 그렇게 바쁜 날이 아니라서 괜찮을거예요.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px]">
        {children}
      </div>
    </div>
  );
}
