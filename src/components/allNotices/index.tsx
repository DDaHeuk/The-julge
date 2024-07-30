import DropDown from '../dropdown';
import MyPostInfo from '../myPostInfo';
import { SORTING_OPTIONS } from '@/types/sortingOptions';
import PaginationComponent from '../pagination';

const AllNotices = () => {
  return (
    <div className="flex px-[12px] md:px-[32px] lg:px-[238px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-center gap-[8px]">
      <div className="flex flex-col gap-[16px] items-start md:flex-row md:justify-between md:items-center w-[100%]">
        <span className="text-[20px] md:text-[28px] font-bold">전체 공고</span>
        <div className="flex items-center gap-[10px]">
          <div className="w-[120px]">
            <DropDown
              menuItems={SORTING_OPTIONS}
              className="flex p-[12px] rounded-[5px] items-center h-[30px] text-[14px] font-bold bg-gray10 "
            />
          </div>
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
      <PaginationComponent totalPage={40} />
    </div>
  );
};

export default AllNotices;
