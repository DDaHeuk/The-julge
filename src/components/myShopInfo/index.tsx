import Image from 'next/image';

const MyShopInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row p-[20px] md:p-[24px] justify-between items-start rounded-[12px] gap-[12px] lg:gap-[30px] 2xl:gap-[70px] bg-red10 mt-[12px]">
      <div
        className="flex justify-center items-center rounded-[12px] w-[100%] h-[308px] md:h-[360px] lg:h-[308px]"
        style={{
          backgroundImage:
            "url('https://s3-alpha-sig.figma.com/img/b4ba/611d/9ea2dc694a4fea4ff31c5ddae734fe8c?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JOOOX2We8JbQMxIGgaWLN9sirs5zjBMOtvs~Tsv7Kqg-ZR1EqVRlPzdlYdWWMh4eu0xcG8U97EpwPqN8mlvB81jiFKeagcMX5493syc0yBQOUGfxgju6uCCcdn-yZtPW-WOMgtmDJOZlUqf1kINwUG39H7lEjX7iCNIvdXvQl5lt-73cX9PboNcSrPAdz-I07V7Xg9c36SAdPGzcASGIhcJbK2-UMv3jj03y7iY6JAVd3ekiM9gTyeIXhddZCRMKaSC80OeiCHW9sfssA9GdUTRcs9XXqoGor~PYy~~kFI5ZPyulLR~1MbWEW6GymsUsVGsZTZQALJbJ~z-BBxWQHQ__')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="flex flex-col items-start self-stretch gap-[24px] md:gap-[40px] pt-0 md:pt-[16px]">
        <div className="flex flex-col items-start gap-[8px] md:gap-[12px] md:w-[346px]  2xl:w-[550px] self-stretch">
          <div className="flex flex-col items-start gap-[8px]">
            <span className="text-[#EA3C12] text-[14px] md:text-[16px] font-bold">식당</span>
            <span className="text-black text-[24px] md:text-[28px] font-bold">도토리 식당</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <Image
              className="md:w-[20px] md:h-[20px]"
              src="/icons/marker.svg"
              alt="마커 아이콘"
              width={16}
              height={16}
            />
            <span className="text-gray50 text-[14px] md:text-[16px]">서울시 송파구</span>
          </div>
          <span className="self-stretch text-black text-[14px] md:text-[16px] leading-[22px] h-[52px] lg:h-[78px]">
            알바하기 편한 너구리네 라면집! 라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는
            가게입니다.
          </span>
        </div>

        <div className="flex items-start gap-[8px] self-stretch">
          <button
            type="button"
            className="w-[100%] bg-white border-[#EA3C12] border  h-[38px] md:h-[48px] rounded-[6px] text-[#EA3C12] font-bold text-[14px] md:text-[16px]"
          >
            편집하기
          </button>
          <button
            type="button"
            className="w-[100%] bg-[#EA3C12] h-[38px] md:h-[48px] rounded-[6px] text-white font-bold text-[14px] md:text-[16px]"
          >
            공고 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyShopInfo;
