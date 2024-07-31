'use client';

import Image from 'next/image';
import { useState } from 'react';
import NotificationModal from '../notificationModal';

const NavigationBar = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [isNotification, setIsNotification] = useState<boolean>(true);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);

  const handleNotiifcation = () => {
    setIsOpenNotification(!isOpenNotification);
  };

  const handleCloseNotification = () => {
    setIsOpenNotification(false);
  };
  return (
    <div className="lg:h-[70px] md:h-[70px] h-[102px] bg-white pt-[15px] pb-[15px] pl-[20px] pr-[20px] lg:pl-[208px] lg:pr-[208px] md:pl-[32px] md:pr-[32px] ">
      <div className="flex-col">
        <div className="flex">
          <div className=" mr-[60px] inline-flex h-[40px] py-[10px] justify-center items-center">
            <Image
              className="md:w-[108.851px] md:h-[20px]"
              src="/images/logo.svg"
              alt="로고 이미지"
              width={81.638}
              height={15}
            />
          </div>
          <div className="md:flex h-[40px] hidden w-[100%]  lg:max-w-[450px] md:max-w-[344px] p-[10px] items-start gap-[10px] rounded-[10px] bg-gray10 mr-[20px]">
            <Image
              className="md:w-[20px] md:h-[20px]"
              src="/icons/search.svg"
              alt="검색 아이콘"
              width={16}
              height={16}
            />
            <input
              className="flex text-[14px] h-[20px] flex-col justify-center outline-none bg-gray10"
              placeholder="가게 이름으로 찾아보세요"
            />
          </div>
          {isAuthorized ? (
            <div className="relative ml-auto inline-flex justify-center items-center gap-[40px]">
              <span className=" text-black text-[14px] md:text-[16px] font-bold">내 가게</span>
              <span className=" text-black text-[14px] md:text-[16px] font-bold">로그아웃</span>
              {isNotification ? (
                <Image
                  onClick={handleNotiifcation}
                  className="md:w-[24px] md:h-[24px]"
                  src="/icons/notification/active.svg"
                  alt="알림 활성화 아이콘"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  className="md:w-[24px] md:h-[24px]"
                  src="/icons/notification/inactive.svg"
                  alt="알림 비활성화 아이콘"
                  width={20}
                  height={20}
                />
              )}
              {isOpenNotification && <NotificationModal onClose={handleCloseNotification} />}
            </div>
          ) : (
            <div className=" ml-auto inline-flex justify-center items-center gap-[40px]">
              <span className=" text-black text-[14px] md:text-[16px] font-bold">로그인</span>
              <span className=" text-black text-[14px] md:text-[16px] font-bold">회원가입</span>
            </div>
          )}
        </div>

        <div className="flex md:hidden w-[100%] p-[10px] items-start gap-[10px] rounded-[10px] bg-gray10 mt-[10px]">
          <Image
            className="md:w-[20px] md:h-[20px]"
            src="/icons/search.svg"
            alt="검색 아이콘"
            width={16}
            height={16}
          />
          <input
            className="flex text-[12px] h-[20px] flex-col justify-center outline-none bg-gray10"
            placeholder="가게 이름으로 찾아보세요"
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
