import COMMON_SHOP_DATA from '@/constant/shop/CommonShopData';
import { create } from 'zustand';

interface ShopInfoState {
  shopData: typeof COMMON_SHOP_DATA;
  setShopData: (newData: Partial<typeof COMMON_SHOP_DATA>) => void;
  resetAll: () => void;
}

const useStoreShopInfo = create<ShopInfoState>((set) => ({
  shopData: { ...COMMON_SHOP_DATA },
  setShopData: (newData: Partial<typeof COMMON_SHOP_DATA>) =>
    set((state) => ({
      shopData: { ...state.shopData, ...newData },
    })),
  resetAll: () => set({ shopData: { ...COMMON_SHOP_DATA } }),
}));

export default useStoreShopInfo;
