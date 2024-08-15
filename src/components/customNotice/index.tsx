'use client';

import MyPostInfo from '../myPostInfo';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomArrow from '../customArrow';

const CustomNotice = () => {
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
          <div className="pr-2">{/* <MyPostInfo deadline={false} /> */}</div>
          <div className="pr-2">{/* <MyPostInfo deadline={false} /> */}</div>
          <div className="pr-2">{/* <MyPostInfo deadline={false} /> */}</div>
          <div className="pr-2">{/* <MyPostInfo deadline={false} /> */}</div>
          <div className="pr-2">{/* <MyPostInfo deadline={false} /> */}</div>
          <div className="pr-2">{/* <MyPostInfo deadline={false} /> */}</div>
          <div className="pr-2">{/* <MyPostInfo deadline={false} /> */}</div>
        </Slider>
      </div>
    </div>
  );
};

export default CustomNotice;
