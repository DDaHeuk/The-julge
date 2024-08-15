const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ko-KR').format(amount);
};
export default formatCurrency;
