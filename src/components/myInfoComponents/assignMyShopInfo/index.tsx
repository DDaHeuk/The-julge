'use client';

import Button from '@/components/commonComponents/button';
import useAssignShop from '@/hooks/useAssignShopMutation';
import useStoreShopInfo from '@/stores/storeShopInfo';
import ShopName from './shopName';
import ShopClassify from './shopClassify';
import ShopAddress from './shopAddress';
import ShopCost from './shopCost';
import ShopImage from './shopImage';
import ShopDescription from './shopDescription';

interface AssignMyShopInfoProps {
  token: string | undefined;
}

const AssignMyShopInfo = ({ token }: AssignMyShopInfoProps) => {
  const { shopData } = useStoreShopInfo();

  const { mutate: assignShop } = useAssignShop();

  const submitAssignShop = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    assignShop({ assignShopInfo: shopData, token });
  };

  return (
    <form onSubmit={submitAssignShop} className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
      <div className="inline-flex flex-col md:flex-row items-start gap-[20px]">
        <ShopName />
        <ShopClassify />
      </div>
      <div className="inline-flex flex-col items-start gap-[20px]">
        <ShopAddress />
        <ShopCost />
      </div>
      <ShopImage />
      <ShopDescription />
      <div className="flex justify-center">
        <Button type="submit" className="w-[100%] md:w-[312px]" color="filled">
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default AssignMyShopInfo;
