import { create } from 'zustand';

interface DetailedFilterData {
  address: string;
  startsAtGte: string;
  hourlyPayGte: number;
  keyword: string;
  setAddress: (locations: string) => void;
  setStartsAtGte: (newStartsAt: string) => void;
  setHourlyPayGte: (newHourlyPay: number) => void;
  setKeyword: (newKeyword: string) => void;
  clearFilter: () => void;
}

const useDetailedFilterData = create<DetailedFilterData>((set) => ({
  address: '',
  startsAtGte: '',
  hourlyPayGte: 0,
  keyword: '',
  setAddress: (locations: string) => set({ address: locations }),
  setStartsAtGte: (newStartsAt: string) => set({ startsAtGte: newStartsAt }),
  setHourlyPayGte: (newHourlyPay: number) => set({ hourlyPayGte: newHourlyPay }),
  setKeyword: (newKeyword: string) => set({ keyword: newKeyword }),
  clearFilter: () =>
    set({
      address: '',
      startsAtGte: '',
      hourlyPayGte: 0,
      keyword: '',
    }),
}));

export default useDetailedFilterData;
