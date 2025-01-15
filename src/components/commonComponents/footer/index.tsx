import Image from 'next/image';

const Footer = () => {
  return (
    <div className="grid h-[126px] md:h-[100px] lg:px-[238px] md:px-[32px] px-[20px] pt-[32px] pb-[16px] md:py-[37px] bg-gray10">
      <div className="grid md:grid-cols-[auto,1fr,auto] md:grid-rows-1 grid-rows-[auto,auto] gap-y-4 items-center">
        {/* 로고 섹션 */}
        <div className="md:col-start-1 text-gray50 text-[16px] md:justify-self-start">
          ©codeit - 2025
        </div>

        {/* 링크 섹션 */}
        <div className="row-start-1 md:col-start-2 flex gap-[30px] md:justify-center">
          <span className="text-gray50 text-[16px] ">Privacy Policy</span>
          <span className="text-gray50 text-[16px]">FAQ</span>
        </div>

        {/* 소셜 아이콘 섹션 */}
        <div className="row-start-1 md:col-start-3 flex items-center gap-[10px] justify-end">
          <Image src="/icons/envelope.svg" alt="봉투 아이콘" width={25} height={25} />
          <Image src="/icons/facebook.svg" alt="페이스북 아이콘" width={25} height={25} />
          <Image src="/icons/instagram.svg" alt="인스타그램 아이콘" width={25} height={25} />
        </div>
      </div>
      {/* <div className="md:hidden flex justify-between items-center self-stretch">
        <div className="flex flex-col items-start gap-[40px]">
          <div className="flex gap-[30px] items-start">
            <span className=" text-gray50 text-[16px]">Privacy Policy</span>
            <span className=" text-gray50 text-[16px]">FAQ</span>
          </div>
          <span className=" text-gray50 text-[16px]">©codeit - 2023</span>
        </div>
        <div className="flex items-start gap-[10px] mb-auto">
          <Image src="/icons/envelope.svg" alt="봉투 아이콘" width={25} height={25} />
          <Image src="/icons/facebook.svg" alt="페이스북 아이콘" width={25} height={25} />
          <Image src="/icons/instagram.svg" alt="인스타그램 아이콘" width={25} height={25} />
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
