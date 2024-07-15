import Image from 'next/image';

const Footer = () => {
  return (
    <div className="flex lg:px-[238px] md:px-[32px] sm:px-[20px] pt-[32px] pb-[16px] md:py-[37px] flex-col items-start gap-[8px] bg-gray10">
      <div className="md:flex sm:hidden justify-between items-center self-stretch">
        <span className=" text-gray50 text-[16px]">©codeit - 2023</span>
        <div className="flex gap-[30px] items-start">
          <span className=" text-gray50 text-[16px]">Privacy Policy</span>
          <span className=" text-gray50 text-[16px]">FAQ</span>
        </div>
        <div className="flex items-start gap-[10px]">
          <Image src="/icons/envelope.svg" alt="봉투 아이콘" width={25} height={25} />
          <Image src="/icons/facebook.svg" alt="페이스북 아이콘" width={25} height={25} />
          <Image src="/icons/instagram.svg" alt="인스타그램 아이콘" width={25} height={25} />
        </div>
      </div>
      <div className="md:hidden flex justify-between items-center self-stretch">
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
      </div>
    </div>
  );
};

export default Footer;
