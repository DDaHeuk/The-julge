import Input from '@/components/commonComponents/input';
import useStoreNoticeInfo from '@/stores/storeNoticeInfo';
import { ChangeEvent } from 'react';

const NoticeCost = () => {
  const { noticeData, setNoticeData } = useStoreNoticeInfo();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNoticeData({
      [name]: value,
    });
  };

  return (
    <Input
      className="w-[100%]"
      variant="unit"
      unitLabel="원"
      label="시급"
      name="hourlyPay"
      value={noticeData.hourlyPay}
      onChange={handleInputChange}
    />
  );
};

export default NoticeCost;
