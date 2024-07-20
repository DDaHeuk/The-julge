import Image from 'next/image';
import Button from '../button';

export default function AnnouncementDetailContainer() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] md:gap-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-primary font-bold md:text-[16px]">식당</p>
            <h2 className="text-[20px] text-black font-bold md:text-[28px]">도토리 식당</h2>
          </div>

          <div className="w-full p-5 bg-white rounded-[12px] md:p-6">
            <div className="relative overflow-hidden w-full h-[200px]">
              <Image src="/images/logo.svg" alt="공고이미지" fill />
            </div>
            <div className="flex flex-col gap-6 gap-10">
              <div className="flex flex-col gap-2 md:gap-3">
                <p className="text-[14px] text-primary font-bold md:text-[16px]">시급</p>
                <p className="text-[24px] text-black font-bold md:text-[28px]">15,000원</p>
                <p className="text-[14px] text-gray50 md:text-[16px]">2000.00.00 15:00-18:00</p>
                <p className="text-[14px] text-gray50 md:text-[16px]">서울시 송파구</p>
                <p className="text-[14px text-black md:text-[16px]">
                  설명입니다 길게해볼게요 설명입니다 길게해볼게요설명입니다 길게해볼게요설명입니다
                  길게해볼게요
                </p>
              </div>
              <Button type="button" className="w-full h-[38px] md:h-[48px]">
                공고 편집하기
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5 bg-gray10 rounded-xl md:p-8">
          <p className="text-[14px] text-black font-bold md:text-[16px]">공고설명</p>
          <p className="text-[14px] text-black md:text-[16px]">
            공고설명입니다공고설명입니다공고설명입니다공고설명입니다공고설명입니다공고설명입니다공고설명입니다공고설명입니다
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px]">
        <div className="flex flex-col gap-3">
          <h2 className="text-black text-5 font-bold md:text-[28px]">신청자목록</h2>
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray20 md:grid-cols-3">
            <p>신청자</p>
            <p>소개</p>
            <p>상태</p>
          </div>
        </div>
      </div>
    </div>
  );
}
