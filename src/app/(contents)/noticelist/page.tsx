import CustomNotice from '@/components/customNotice';
import DropDown from '@/components/dropdown';
import MyPostInfo from '@/components/myPostInfo';

const noticeList = () => {
  const items = ['마감임박순', '시급많은순', '시간적은순', '가나다순'];
  return (
    <div className="flex flex-col w-[100%]">
      <CustomNotice />
      <div className="flex px-[12px] pt-[40px] pb-[80px] flex-col items-start gap-[8px]">
        <div className="flex flex-col items-start gap-[16px] w-[100%]">
          <span className="text-[20px] font-bold">전체 공고</span>
          <div className="flex items-start gap-[10px]">
            <DropDown
              menuItems={items}
              className="flex p-[12px] rounded-[5px] items-center w-[105px] h-[30px] bg-gray10 "
            />
            <button className="flex w-[79px] h-[30px] items-center justify-center rounded-[5px] bg-red30 text-white text-[14px] font-bold">
              상세 필터
            </button>
          </div>
        </div>
        <div className="mt-[10px] grid grid-cols-2 grid-rows-3 gap-x-[9px] gap-y-[16px] w-[100%]">
          <MyPostInfo deadline={false} />
          <MyPostInfo deadline={false} />
          <MyPostInfo deadline={false} />
          <MyPostInfo deadline={false} />
          <MyPostInfo deadline={false} />
          <MyPostInfo deadline={false} />
        </div>
      </div>
    </div>
  );
};
export default noticeList;
