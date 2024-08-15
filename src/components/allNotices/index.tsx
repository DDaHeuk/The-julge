'use client';

import React, { useState } from 'react';
import { SORTING_OPTIONS } from '@/types/sortingOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import DropDown from '../dropdown';
import PaginationComponent from '../pagination';
import DetailedFilter from '../detailedFilter';
import NoticeList from '../noticeList';

const AllNotices = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['noticeDetail'],
    queryFn: FetchAllNotice,
  });
  const fetchData = data.items;
  console.log(fetchData);

  const [isOpenDetailFilter, setIsOpenDetailFilter] = useState<boolean>(false);

  const handleFilter = () => {
    setIsOpenDetailFilter(!isOpenDetailFilter);
  };

  const handleCloseFilter = () => {
    setIsOpenDetailFilter(false);
  };

  return (
    <div className="flex px-[12px] md:px-[32px] lg:px-[238px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-center gap-[8px]">
      <div className="relative flex flex-col gap-[16px] items-start md:flex-row md:justify-between md:items-center w-[100%]">
        <span className="text-[20px] md:text-[28px] font-bold">전체 공고</span>
        <div className=" flex items-center gap-[10px]">
          <div className="w-[120px]">
            <DropDown
              menuItems={SORTING_OPTIONS}
              className="flex p-[12px] rounded-[5px] items-center h-[30px] text-[14px] font-bold bg-gray10 "
            />
          </div>
          <button
            type="button"
            onClick={handleFilter}
            className="flex w-[79px] h-[30px] items-center justify-center rounded-[5px] bg-red30 text-white text-[14px] font-bold"
          >
            상세 필터
          </button>
        </div>
        {isOpenDetailFilter && <DetailedFilter onClose={handleCloseFilter} />}
      </div>
      <div className="mt-[10px] grid grid-cols-2 grid-rows-3 gap-x-[9px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[30px] w-[100%]">
        {fetchData.map((notice) => (
          <NoticeList key={notice.item.id} noticeData={notice} />
        ))}
      </div>
      <PaginationComponent totalPage={40} />
    </div>
  );
};

export default AllNotices;
