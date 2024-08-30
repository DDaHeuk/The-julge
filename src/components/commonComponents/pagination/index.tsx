'use client';

import React, { useState } from 'react';
import Pagination from 'react-js-pagination';

interface PaginationProps {
  totalPage: number;
}

const ITEMS_PER_PAGE = 7;
const INITIAL_START_PAGE = 1;
const PAGE_COUNT = 1;

const PaginationComponent = ({ totalPage }: PaginationProps) => {
  const [activePage, setActivePage] = useState(INITIAL_START_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="flex justify-center items-center mt-4 mb-4 h-[32px] md:h-[40px] text-[14px] md:text-[16px]">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={PAGE_COUNT}
        totalItemsCount={totalPage}
        pageRangeDisplayed={ITEMS_PER_PAGE}
        onChange={handlePageChange}
        innerClass="flex list-none p-0 h-[32px] md:h-[40px] items-center"
        itemClass="mx-1"
        linkClass="px-2 py-1 md:px-3 md:py-2 rounded hover:bg-gray10 hover:text-black "
        activeLinkClass="bg-red20 text-white "
      />
    </div>
  );
};

export default PaginationComponent;
