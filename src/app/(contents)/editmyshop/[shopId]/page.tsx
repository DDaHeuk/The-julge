import AssignHeader from '@/components/assignHeader';
import EditMyShopInfo from '@/components/editMyShopInfo';
import { cookies } from 'next/headers';

interface EditMyShopProps {
  params: {
    shopId: string;
  };
}

const editMyShop = ({ params }: EditMyShopProps) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  return (
    <div className="flex px-[12px] md:px-[32px] lg:px-[400px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-start bg-gray5">
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px] w-[100%]">
        <AssignHeader title="가게 정보 편집" />
        <EditMyShopInfo shopId={params.shopId} token={token} />
      </div>
    </div>
  );
};

export default editMyShop;
