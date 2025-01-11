import DropDown from '@/components/commonComponents/dropdown';
import Input from '@/components/commonComponents/input';
import LOCATION from '@/constant/location';
import useStoreShopInfo from '@/stores/storeShopInfo';
import { ChangeEvent } from 'react';

const ShopAddress = () => {
  const { shopData, setShopData } = useStoreShopInfo();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopData({ [name]: value });
  };

  const handleDropDownChange = (name: string, value: string) => {
    setShopData({ [name]: value });
  };

  return (
    <div className="w-[100%]  flex flex-col md:flex-row gap-[20px]">
      <div className="flex flex-col items-start gap-[8px] w-[100%]">
        <p>주소</p>
        <DropDown
          menuItems={LOCATION}
          className="w-[100%] bg-white h-[58px] border rounded-[6px] border-gray30 py-[16px] px-[20px]"
          onSelect={(value) => handleDropDownChange('address1', value)}
          initialValue={shopData.address1}
        />
      </div>
      <Input
        className="w-[100%] "
        variant="normal"
        name="address2"
        label="상세주소"
        onChange={handleInputChange}
        value={shopData.address2}
      />
    </div>
  );
};

export default ShopAddress;
