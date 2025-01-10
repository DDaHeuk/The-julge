import Input from '@/components/commonComponents/input';
import useStoreShopInfo from '@/stores/storeShopInfo';
import { ChangeEvent } from 'react';

const ShopName = () => {
  const { shopData, setShopData } = useStoreShopInfo();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopData({ [name]: value });
  };

  return (
    <Input
      className="w-[100%]"
      variant="normal"
      name="name"
      label="가게 이름"
      onChange={handleInputChange}
      value={shopData.name}
    />
  );
};

export default ShopName;
