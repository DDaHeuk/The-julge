'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSuspenseQuery } from '@tanstack/react-query';
import FetchAllNotice from '@/apis/notice/fetchAllNotice';
import CustomArrow from '../customArrow';
import NoticeList from '../noticeList';
import { useAddress } from '@/stores/storeUserInfo';

interface CustomNotice {
  initialAddress: string | undefined;
}

const CustomNotice = ({ initialAddress }: CustomNotice) => {
  const offset = 0;
  const limit = 6;

  const { data } = useSuspenseQuery({
    queryKey: ['noticeCustom', initialAddress],
    queryFn: () =>
      FetchAllNotice({
        offset,
        limit,
        address: initialAddress ? initialAddress : undefined,
        keyword: undefined,
        startsAtGte: undefined,
        hourlyPayGte: undefined,
        sort: undefined,
      }),
  });

  const fetchData = data?.items;

  const settings = {
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    responsive: [
      {
        breakpoint: 743, // 모바일 사이즈
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flex px-[30px] md:px-[36px] lg:px-[238px] py-[40px] md:py-[60px] flex-col items-start bg-red10 mt-[10px]">
      <div className="flex flex-col gap-[20px] w-[100%]">
        <span className="text-[20px] md:text-[28px] font-bold">맞춤 공고</span>

        <Slider {...settings}>
          {fetchData?.map((notice) => <NoticeList key={notice.item.id} noticeData={notice} />)}
        </Slider>
      </div>
    </div>
  );
};

export default CustomNotice;
