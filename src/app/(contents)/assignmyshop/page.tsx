import AssignHeader from '@/components/commonComponents/assignHeader';
import AssignMyShopInfo from '@/components/myInfoComponents/assignMyShopInfo';

const assignMyShop = () => {
  return (
    <div className="flex px-[12px] md:px-[32px] lg:px-[400px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-start bg-gray5">
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px] w-[100%]">
        <AssignHeader title="가게 정보 등록" />
        <AssignMyShopInfo />
      </div>
    </div>
  );
};

export default assignMyShop;
