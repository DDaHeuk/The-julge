'use client';

import React, { useEffect, useState } from 'react';
// import { SORTING_OPTIONS } from '@/types/sortingOptions';
import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import useDetailedFilterData from '@/stores/storeDetailedFilter';
import DropDown from '../dropdown';
import DetailedFilter from '../detailedFilter';
import NoticeList from '../noticeList';
import Pagination2 from '../pagenation2';

export interface ShopItem {
  id: string;
  name: string;
  imageUrl?: string;
  address1: string;
  originalHourlyPay: number;
}

export interface NoticeItem {
  id: string;
  closed: boolean;
  startsAt: string;
  workhour: number;
  hourlyPay: number;
  shop: {
    item: ShopItem;
  };
}

export interface Notice {
  item: NoticeItem;
}

export interface NoticeListResponse {
  items: Notice[];
  totalCount: number;
  count: number;
}
const SORTING_OPTIONS = [
  { label: '마감임박순', value: 'time' },
  { label: '시급많은순', value: 'pay' },
  { label: '시간적은순', value: 'hour' },
  { label: '가나다순', value: 'shop' },
];

const AllNotices = () => {
  const { keyword, address, startsAtGte, hourlyPayGte } = useDetailedFilterData();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(0);
  const [selectedSort, setSelectedSort] = useState<'time' | 'pay' | 'hour' | 'shop' | string>(
    SORTING_OPTIONS[0].value,
  );
  const limit = 6; // 한 페이지당 나오는 item 개수. 임의로 설정. 추후 변경 필요
  const offset = page * limit;
  const [allNoticeTitle, setAllNoticeTitle] = useState<string>('전체 공고');

  useEffect(() => {
    if (searchParams.get('page')) {
      setPage(Number(searchParams.get('page')) - 1);
    } else {
      setPage(0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (keyword) {
      setAllNoticeTitle(keyword);
    } else {
      setAllNoticeTitle('전체 공고');
    }
  }, [keyword]);

  const { data } = useSuspenseQuery<NoticeListResponse>({
    queryKey: [
      'noticeAll',
      offset,
      limit,
      selectedSort,
      keyword,
      address,
      startsAtGte ? `${startsAtGte}T00:00:00Z` : undefined,
      hourlyPayGte,
    ],
    queryFn: () =>
      FetchAllNotice({
        offset,
        limit,
        address,
        keyword,
        startsAtGte: startsAtGte ? `${startsAtGte}T00:00:00Z` : undefined,
        hourlyPayGte,
        sort: selectedSort,
      }),
  });

  const fetchData = data?.items;

  const [isOpenDetailFilter, setIsOpenDetailFilter] = useState<boolean>(false);

  const handleFilter = () => {
    setIsOpenDetailFilter(!isOpenDetailFilter);
  };

  const handleCloseFilter = () => {
    setIsOpenDetailFilter(false);
  };

  const handleSortChange = (selectedLabel: string) => {
    const selectedOption = SORTING_OPTIONS.find((option) => option.label === selectedLabel);
    if (selectedOption) {
      setSelectedSort(selectedOption.value);
    }
  };

  const filterCount = (address ? 1 : 0) + (startsAtGte ? 1 : 0) + (hourlyPayGte ? 1 : 0);

  return (
    <div className="flex px-[12px] md:px-[32px] lg:px-[400px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-center gap-[8px]">
      <div className="relative flex flex-col gap-[16px] items-start md:flex-row md:justify-between md:items-center w-[100%]">
        <div className="flex flex-row">
          <span
            className={`text-[20px] md:text-[28px] font-bold ${allNoticeTitle !== '전체 공고' ? 'text-red40' : 'text-black'}`}
          >
            {allNoticeTitle}
          </span>
          {allNoticeTitle !== '전체 공고' && (
            <span className="text-[20px] md:text-[28px] font-bold ">에 대한 공고 목록</span>
          )}
        </div>
        <div className=" flex items-center gap-[10px]">
          <div className="w-[120px]">
            <DropDown
              menuItems={SORTING_OPTIONS.map((option) => option.label)}
              onSelect={handleSortChange}
              className="flex p-[12px] rounded-[5px] items-center h-[30px] text-[14px] font-bold bg-gray10 "
            />
          </div>
          <button
            type="button"
            onClick={handleFilter}
            className="flex w-[85px] h-[30px] items-center justify-center rounded-[5px] bg-red30 text-white text-[14px] font-bold"
          >
            상세 필터{`(${filterCount})`}
          </button>
        </div>
        {isOpenDetailFilter && <DetailedFilter onClose={handleCloseFilter} />}
      </div>
      <div className="mt-[10px] grid grid-cols-2 grid-rows-3 gap-x-[9px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[30px] w-[100%]">
        {fetchData?.map((notice) => <NoticeList key={notice.item.id} noticeData={notice} />)}
      </div>
      <Pagination2
        totalPages={Math.ceil(data.count / limit)}
        currentPage={page + 1}
        onPageChange={(newPage) => setPage(newPage - 1)}
      />
    </div>
  );
};

export default AllNotices;
