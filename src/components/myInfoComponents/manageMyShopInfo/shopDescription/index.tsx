import useStoreShopInfo from '@/stores/storeShopInfo';
import { ChangeEvent } from 'react';

const ShopDescription = () => {
  const { shopData, setShopData } = useStoreShopInfo();

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShopData({ [name]: value });
  };

  return (
    <div className="inline-flex flex-col items-start gap-[8px]">
      <span className="text-black text-[16px]">가게 설명</span>
      <textarea
        placeholder="입력"
        name="description"
        className="flex resize-none h-[153px] px-[20px] py-[16px] items-start self-stretch rounded-[5px] border border-gray30 bg-white "
        onChange={handleTextAreaChange}
        value={shopData.description}
      />
    </div>
  );
};

export default ShopDescription;
