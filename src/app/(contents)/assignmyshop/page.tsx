import AssignMyShopHeader from '@/components/assignMyShopHeader';
import AssignMyShopInfo from '@/components/assignMyShopInfo';
import Button from '@/components/button/indext';

const assignMyShop = () => {
  return (
    <div className="flex px-[12px] md:px-[32px] lg:px-[238px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-start bg-gray5">
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px] w-[100%]">
        <AssignMyShopHeader />
        <AssignMyShopInfo />
        <Button className="w-[100%] md:w-[312px]" color="filled">
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default assignMyShop;
