import AssignHeader from '@/components/assignHeader';
import EditMyShopInfo from '@/components/editMyShopInfo';

interface editMyShopProps {
  params: {
    shopId: string;
  };
}

const editMyShop = ({ params }: editMyShopProps) => {
  return (
    <div className="flex px-[12px] md:px-[32px] lg:px-[238px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-start bg-gray5">
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px] w-[100%]">
        <AssignHeader title="가게 정보 편집" />
        <EditMyShopInfo shopId={params.shopId} />
      </div>
    </div>
  );
};

export default editMyShop;
