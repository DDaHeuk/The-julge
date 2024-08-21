import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DetailedFilterData {
  address: string;
  startsAtGte: string;
  hourlyPayGte: number;
  setAddress: (locations: string) => void;
  setStartsAtGte: (newStartsAt: string) => void;
  setHourlyPayGte: (newHourlyPay: number) => void;
  clearFilter: () => void;
}

export const useDetailedFilterData = create(
  persist<DetailedFilterData>(
    (set) => ({
      address: '',
      startsAtGte: '',
      hourlyPayGte: 0,
      setAddress: (locations: string) => set({ address: locations }),
      setStartsAtGte: (newStartsAt: string) => set({ startsAtGte: newStartsAt }),
      setHourlyPayGte: (newHourlyPay: number) => set({ hourlyPayGte: newHourlyPay }),
      clearFilter: () =>
        set({
          address: '',
          startsAtGte: '',
          hourlyPayGte: 0,
        }),
    }),
    {
      name: 'detailedFilterStorage',
    },
  ),
);
