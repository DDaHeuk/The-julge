'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useSearchParams } from 'next/navigation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSuspenseQuery } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import { useAddress } from '@/stores/storeUserInfo';
import sliderSettings from '@/constant/sliderSetting';
import NoticeList from '../../noticeComponents/noticeList';
import { NoticeListResponse } from '../allNotices';

const CustomNotice = () => {
  const offset = 0;
  const limit = 6;

  const { userAddress } = useAddress();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');

  // SearchParams에서 keyword 가져오기
  useEffect(() => {
    const keywordParams = searchParams.get('keyword') || ''; // URL에서 keyword 가져오기
    setKeyword(keywordParams);
  }, [searchParams]);

  const { data } = useSuspenseQuery<NoticeListResponse>({
    queryKey: ['noticeAll', userAddress],
    queryFn: () =>
      FetchAllNotice({
        offset,
        limit,
        address: userAddress || undefined,
        keyword: undefined,
        startsAtGte: undefined,
        hourlyPayGte: undefined,
        sort: undefined,
      }),
    staleTime: 0,
  });

  const fetchData = data?.items;

  if (keyword) {
    return null;
  }

  return (
    <div className="flex px-[30px] md:px-[36px] lg:px-[400px] py-[40px] md:py-[60px] flex-col items-start bg-red10 mt-[10px]">
      <div className="flex flex-col gap-[20px] w-[100%]">
        <span className="text-[20px] md:text-[28px] font-bold">맞춤 공고</span>
        <Slider {...sliderSettings}>
          {fetchData?.map((notice) => (
            <div className="slider-item px-1" key={notice.item.id}>
              <NoticeList noticeData={notice} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomNotice;
