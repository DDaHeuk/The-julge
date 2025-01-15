import Input from '@/components/commonComponents/input';
import useStoreNoticeInfo from '@/stores/storeNoticeInfo';
import { ChangeEvent } from 'react';

const NoticeWorkHour = () => {
  const { noticeData, setNoticeData } = useStoreNoticeInfo();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNoticeData({
      [name]: value,
    });
  };

  return (
    <Input
      className="w-[100%] md:w-[49%] lg:w-[33.1%]"
      variant="unit"
      unitLabel="시간"
      label="업무 시간"
      name="workhour"
      value={noticeData.workhour}
      onChange={handleInputChange}
    />
  );
};

export default NoticeWorkHour;
