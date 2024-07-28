import DropDown from '../dropdown';
import MyPostInfo from '../myPostInfo';
import { SORTING_OPTIONS } from '@/types/sortingOptions';

const AllNotices = () => {
  return (
    <div className="flex px-[12px] md:px-[32px] lg:px-[238px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-start gap-[8px]">
      <div className="flex  md:hidden flex-col items-start gap-[16px] w-[100%]">
        <span className="text-[20px] font-bold">전체 공고</span>
        <div className="flex items-start gap-[10px]">
          <DropDown
            menuItems={SORTING_OPTIONS}
            className="flex p-[12px] rounded-[5px] items-center w-[105px] h-[30px] bg-gray10 "
          />
          <button className="flex w-[79px] h-[30px] items-center justify-center rounded-[5px] bg-red30 text-white text-[14px] font-bold">
            상세 필터
          </button>
        </div>
      </div>
      <div className="hidden md:flex justify-between w-[100%]">
        <span className="text-[20px] md:text-[28px] font-bold">전체 공고</span>
        <div className="flex items-start gap-[10px]">
          <DropDown
            menuItems={SORTING_OPTIONS}
            className="flex p-[12px] rounded-[5px] items-center w-[105px] h-[30px] bg-gray10 "
          />
          <button className="flex w-[79px] h-[30px] items-center justify-center rounded-[5px] bg-red30 text-white text-[14px] font-bold">
            상세 필터
          </button>
        </div>
      </div>
      <div className="mt-[10px] grid grid-cols-2 grid-rows-3 gap-x-[9px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[30px] w-[100%]">
        <MyPostInfo deadline={false} />
        <MyPostInfo deadline={false} />
        <MyPostInfo deadline={false} />
        <MyPostInfo deadline={false} />
        <MyPostInfo deadline={false} />
        <MyPostInfo deadline={false} />
      </div>
    </div>
  );
};

export default AllNotices;
