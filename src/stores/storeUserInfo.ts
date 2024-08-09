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
