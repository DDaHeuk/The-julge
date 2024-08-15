import Image from 'next/image';
import { ShopDetailData } from '@/types/shopDetailData';
import { useRouter } from 'next/navigation';

interface MyShopInfoProps {
  shopInfo: ShopDetailData['item'];
}

const MyShopInfo = ({ shopInfo }: MyShopInfoProps) => {
  const router = useRouter();

  const moveToAssignPage = () => {
    router.push('/assignnotice');
  };

  const moveToEditPage = () => {
    router.push('/assignnotice');
  };

  return (
    <div className="flex flex-col lg:flex-row p-[20px] md:p-[24px] justify-between items-start rounded-[12px] gap-[12px] lg:gap-[30px] 2xl:gap-[70px] bg-red10 mt-[12px]">
      <div
        className="flex justify-center items-center rounded-[12px] w-[100%] h-[308px] md:h-[360px] lg:h-[308px]"
        style={{
          backgroundImage: `url(${shopInfo.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="flex flex-col items-start self-stretch gap-[24px] md:gap-[40px] pt-0 md:pt-[16px]">
        <div className="flex flex-col items-start gap-[8px] md:gap-[12px] md:w-[346px]  2xl:w-[550px] self-stretch">
          <div className="flex flex-col items-start gap-[8px]">
            <span className="text-[#EA3C12] text-[14px] md:text-[16px] font-bold">식당</span>
            <span className="text-black text-[24px] md:text-[28px] font-bold">{shopInfo.name}</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <Image
              className="md:w-[20px] md:h-[20px]"
              src="/icons/marker.svg"
              alt="마커 아이콘"
              width={16}
              height={16}
            />
            <span className="text-gray50 text-[14px] md:text-[16px]">{shopInfo.address1}</span>
          </div>
          <span className="self-stretch text-black text-[14px] md:text-[16px] leading-[22px] h-[52px] lg:h-[78px]">
            {shopInfo.description}
          </span>
        </div>

        <div className="flex items-start gap-[8px] self-stretch">
          <button
            type="button"
            className="w-[100%] bg-white border-[#EA3C12] border  h-[38px] md:h-[48px] rounded-[6px] text-[#EA3C12] font-bold text-[14px] md:text-[16px]"
            onClick={moveToEditPage}
          >
            편집하기
          </button>
          <button
            type="button"
            className="w-[100%] bg-[#EA3C12] h-[38px] md:h-[48px] rounded-[6px] text-white font-bold text-[14px] md:text-[16px]"
            onClick={moveToAssignPage}
          >
            공고 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyShopInfo;
