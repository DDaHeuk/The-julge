export const SORTING_OPTIONS = [
  { label: '마감임박순', value: 'time' },
  { label: '시급많은순', value: 'pay' },
  { label: '시간적은순', value: 'hour' },
  { label: '가나다순', value: 'shop' },
];

export type sortingOptions = (typeof SORTING_OPTIONS)[number];
