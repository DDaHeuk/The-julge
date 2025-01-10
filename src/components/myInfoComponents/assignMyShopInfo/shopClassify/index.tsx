import DropDown from '@/components/commonComponents/dropdown';
import useStoreShopInfo from '@/stores/storeShopInfo';
import { FOOD_CATEGORIES } from '@/types/foodCategory';

const ShopClassify = () => {
  const { setShopData } = useStoreShopInfo();

  const handleDropDownChange = (name: string, value: string) => {
    setShopData({ [name]: value });
  };

  return (
    <div className="flex flex-col items-start gap-[8px] w-[100%]">
      <p>분류</p>
      <DropDown
        menuItems={FOOD_CATEGORIES}
        className="w-[100%] bg-white h-[58px] border rounded-[6px] border-gray30 py-[16px] px-[20px]"
        onSelect={(value) => handleDropDownChange('category', value)}
      />
    </div>
  );
};

export default ShopClassify;
