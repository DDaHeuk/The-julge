import AllNotices from '@/components/homeComponents/allNotices';
import CustomNotice from '@/components/homeComponents/customNotice';

const noticeList = () => {
  return (
    <div className="flex flex-col w-[100%]">
      <CustomNotice />
      <AllNotices />
    </div>
  );
};
export default noticeList;
