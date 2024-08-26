import AllNotices from '@/components/allNotices';
import CustomNotice from '@/components/customNotice';

const noticeList = () => {
  return (
    <div className="flex flex-col w-[100%]">
      <CustomNotice />
      <AllNotices />
    </div>
  );
};
export default noticeList;
