import Input from '@/components/commonComponents/input';
import useStoreShopInfo from '@/stores/storeShopInfo';
import { ChangeEvent } from 'react';

const ShopCost = () => {
  const { setShopData } = useStoreShopInfo();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopData({ [name]: value });
  };

  return (
    <Input
      className="w-full md:w-[49%]"
      variant="unit"
      name="originalHourlyPay"
      unitLabel="원"
      label="기본 시급"
      onChange={handleInputChange}
    />
  );
};

export default ShopCost;
