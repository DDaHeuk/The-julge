import Input from '@/components/commonComponents/input';
import useStoreNoticeInfo from '@/stores/storeNoticeInfo';
import { ChangeEvent } from 'react';

const NoticeDate = () => {
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
      variant="dateTime"
      label="시작 일시"
      name="startsAt"
      value={noticeData.startsAt}
      onChange={handleInputChange}
    />
  );
};

export default NoticeDate;
