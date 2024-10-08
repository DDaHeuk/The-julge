import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserType {
  myType: string;
  setMyType: (newMyType: string) => void;
}

export const useMyType = create(
  persist<UserType>(
    (set) => ({
      myType: '',
      setMyType: (newMyType: string) => set({ myType: newMyType }),
    }),
    {
      name: 'userTypeStorage',
    },
  ),
);

interface UserID {
  userId: string;
  setUserId: (newUserId: string) => void;
}

export const useUserId = create(
  persist<UserID>(
    (set) => ({
      userId: '',
      setUserId: (newUserId: string) => set({ userId: newUserId }),
    }),
    {
      name: 'userIdStorage',
    },
  ),
);

interface ShopID {
  shopId: string;
  setShopId: (newShopId: string) => void;
}

export const useShopId = create(
  persist<ShopID>(
    (set) => ({
      shopId: '',
      setShopId: (newShopId: string) => set({ shopId: newShopId }),
    }),
    {
      name: 'userShopIdStorage',
    },
  ),
);

interface UserAddress {
  userAddress: string;
  setUserAddress: (newUserAddress: string) => void;
}

export const useAddress = create(
  persist<UserAddress>(
    (set) => ({
      userAddress: '',
      setUserAddress: (newUserAddress: string) => set({ userAddress: newUserAddress }),
    }),
    {
      name: 'userAddressStorage',
    },
  ),
);

export interface UserApplication {
  userApplication: unknown[];
  setUserApplication: (newUserApplication: unknown[]) => void;
}

export const useApplication = create(
  persist<UserApplication>(
    (set) => ({
      userApplication: [],
      setUserApplication: (newUserApplication) => set({ userApplication: newUserApplication }),
    }),
    {
      name: 'userApplicationStorage',
    },
  ),
);
