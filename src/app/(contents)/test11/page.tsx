'use client';

import React, { useState } from 'react';
import Button from '@/components/button';
import MyPostInfo from '@/components/myPostInfo';
import MyShopInfo from '@/components/myShopInfo';
import Pagination from 'react-js-pagination';
import DetailedFilter from '@/components/detailedFilter';

export default function test11() {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  return (
    <div>
      <MyShopInfo />
      <MyPostInfo deadline={true} />
      <Button className="w-[100%]" color="filled">
        등록하기
      </Button>
      <div className="flex justify-center items-center mt-4 mb-4 h-[32px] md:h-[40px] text-[14px] md:text-[16px]">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={1}
          totalItemsCount={40}
          pageRangeDisplayed={7}
          onChange={handlePageChange}
          innerClass="flex list-none p-0 h-[32px] md:h-[40px] items-center"
          itemClass="mx-1"
          linkClass="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray10 hover:text-black "
          activeLinkClass="bg-red20 text-white "
        />
      </div>
      <DetailedFilter />
    </div>
  );
}
