'use client';

import Button from '@/components/commonComponents/button';
import useAssignShop from '@/hooks/useAssignShopMutation';
import useStoreShopInfo from '@/stores/storeShopInfo';
import { validateShopData } from '@/utils/validation';
import useEditShop from '@/hooks/useEditShopMutation';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import ShopName from './shopName';
import ShopClassify from './shopClassify';
import ShopAddress from './shopAddress';
import ShopCost from './shopCost';
import ShopImage from './shopImage';
import ShopDescription from './shopDescription';

interface ManageMyShopInfoProps {
  token: string | undefined;
  shopId?: string | undefined;
  manageType: '등록' | '편집';
}

const ManageMyShopInfo = ({ token, manageType, shopId }: ManageMyShopInfoProps) => {
  const { shopData } = useStoreShopInfo();

  const { mutate: assignShop, isPending: isAssigning } = useAssignShop();
  const { mutate: editShop, isPending: isEditing } = useEditShop();
  const isLoading = isAssigning || isEditing;

  useBeforeUnload();

  const submitShopData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manageType === '등록') {
      assignShop({ assignShopInfo: shopData, token });
    } else {
      editShop({ data: shopData, shopId, token });
    }
  };

  return (
    <form onSubmit={submitShopData} className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
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
        <Button
          type="submit"
          className="w-[100%] md:w-[312px]"
          color="filled"
          disabled={validateShopData(shopData) || isLoading}
          pending={isLoading}
        >
          {`${manageType}하기`}
        </Button>
      </div>
    </form>
  );
};

export default ManageMyShopInfo;
