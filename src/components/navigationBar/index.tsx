'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import NotificationModal from '../notificationModal';
import Link from 'next/link';
import { useShopId, useMyType, useUserId } from '@/stores/storeUserInfo';
import getUserAlert from '@/apis/alert/getUserAlert';

const NavigationBar = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);

  const { shopId, setShopId } = useShopId();
  const { myType, setMyType } = useMyType();
  const { userId, setUserId } = useUserId();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthorized(true);
      const fetchAlerts = async () => {
        if (userId) {
          const response = await getUserAlert({
            userId: userId,
            offset: 0,
          });
          setIsNotification(response.count > 0 ? true : false);
        }
      };
      fetchAlerts();
    } else {
      setIsAuthorized(false);
    }
  }, [userId, isAuthorized]);

  const handleNotiifcation = () => {
    setIsOpenNotification(!isOpenNotification);
  };

  const handleCloseNotification = () => {
    setIsOpenNotification(false);
  };

  const handleRemoveToken = () => {
    localStorage.clear();
    setShopId('');
    setMyType('');
    setUserId('');
    document.cookie = 'shopId=; path=/; max-age=0;';
    setIsAuthorized(false);
  };

  return (
    <div className="bg-white h-[102px] md:h-[70px] py-[10px] px-[20px] md:px-[32px] md:py-[15px] lg:px-[208px]">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="pr-[2.362px] md:pr-[3.15px] py-[7.5px] md:py-[10px] inline-flex justify-center items-center shrink-0">
            <Link href={'/'}>
              <Image
                className="md:w-[108.851px] md:h-[20px]"
                src="/images/logo.svg"
                alt="로고 이미지"
                width={81.638}
                height={15}
              />
            </Link>
          </div>
          <div className="hidden w-[100%] md:flex lg:max-w-[450px] md:max-w-[344px] p-[10px] items-start gap-[10px] rounded-[10px] bg-gray10 ml-[10px]">
            <Image
              className="md:w-[20px] md:h-[20px]"
              src="/icons/search.svg"
              alt="검색 아이콘"
              width={16}
              height={16}
            />
            <input
              className="flex text-[14px] h-[20px] flex-col justify-center outline-none shrink-0 bg-gray10 text-gray40 md:leading-[22px] "
              placeholder="가게 이름으로 찾아보세요"
            />
          </div>
          {isAuthorized ? (
            <div className="relative inline-flex justify-center items-center gap-[16px] md:gap-[12px] lg:gap-[40px]">
              {myType === 'employer' ? (
                <Link href={`/myshop/${shopId}`}>
                  <span className="text-black text-[14px] font-bold md:text-[16px] leading-[20px]">
                    내 가게
                  </span>
                </Link>
              ) : (
                <Link href={`/myprofile/${userId}`}>
                  <span className="text-black text-[14px] font-bold md:text-[16px] leading-[20px]">
                    내 프로필
                  </span>
                </Link>
              )}
              <Link href={`/`}>
                <span
                  className="text-black text-[14px] font-bold md:text-[16px] leading-[20px]"
                  role="button"
                  onClick={handleRemoveToken}
                >
                  로그아웃
                </span>
              </Link>
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
            <div className="inline-flex justify-center items-center gap-[16px] md:gap-[12px] lg:gap-[40px]">
              <Link href={'/signin'}>
                <span className="text-black text-[14px] font-bold md:text-[16px] leading-[20px] cursor-pointer">
                  로그인
                </span>
              </Link>
              <Link href={'/signup'}>
                <span className="text-black text-[14px] font-bold md:text-[16px] leading-[20px] cursor-pointer">
                  회원가입
                </span>
              </Link>
            </div>
          )}
        </div>

        <div className="flex md:hidden w-[100%] p-[8px] items-center gap-[8px] rounded-[10px] bg-gray10 mt-[16px]">
          <Image src="/icons/search.svg" alt="검색 아이콘" width={16} height={16} />
          <input
            className="flex text-[12px] w-[233px] outline-none h-[20px] flex-col justify-center shrink-0 leading-[16px] bg-gray10 text-gray40"
            placeholder="가게 이름으로 찾아보세요"
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
