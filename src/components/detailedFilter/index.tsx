/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { LOCATION } from '@/constant/location';
import Input from '../input';
import Button from '../button';
import { useDetailedFilterData } from '@/stores/storeDetailedFilter';

interface DetailedFilterProps {
  onClose: () => void;
}

const DetailedFilter = ({ onClose }: DetailedFilterProps) => {
  const {
    address,
    startsAtGte,
    hourlyPayGte,
    setAddress,
    setStartsAtGte,
    setHourlyPayGte,
    clearFilter,
  } = useDetailedFilterData();

  //로컬상태관리
  const [localAddress, setLocalAddress] = useState<string[]>(address);
  const [localStartsAtGte, setLocalStartsAtGte] = useState(startsAtGte);
  const [localHourlyPayGte, setLocalHourlyPayGte] = useState<number | undefined>(hourlyPayGte);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'startsAtGte') {
      setLocalStartsAtGte(value);
    } else if (name === 'hourlyPayGte') {
      setLocalHourlyPayGte(Number(value));
    }
  };

  const handleLocationClick = (location: string) => {
    if (!localAddress.includes(location)) {
      setLocalAddress([...localAddress, location]);
    }
  };

  const handleRemoveLocation = (location: string) => {
    setLocalAddress(localAddress.filter((item) => item !== location));
  };

  const handleApply = () => {
    // 로컬 상태를 zustand 스토어에 저장
    setAddress(localAddress);
    setStartsAtGte(localStartsAtGte);
    if (localHourlyPayGte !== undefined) {
      setHourlyPayGte(localHourlyPayGte);
    }
    console.log(address, startsAtGte, hourlyPayGte);
    onClose();
  };

  const handleClear = () => {
    clearFilter();
    onClose();
  };

  return (
    <div className="bg-white  fixed top-0 h-full w-full left-0 md:w-[390px] md:h-auto md:absolute md:top-[120%] md:right-0 md:left-auto z-50 flex py-[24px] px-[12px] md:px-[20px] flex-col items-start gap-[24px] rounded-[10px] border border-gray20 shadow-gray20">
      <div className="flex justify-between items-center self-stretch">
        <p className="text-[20px] font-bold">상세 필터</p>
        <Image
          onClick={() => onClose()}
          src="/icons/close.svg"
          alt="닫기 버튼"
          width={24}
          height={24}
        />
      </div>
      <div className="flex flex-col items-start gap-[12px] w-[100%]">
        <span className="text-[16px]">위치</span>
        <div className="grid grid-cols-2 w-[100%] h-[258px] overflow-y-auto gap-y-2 gap-x-5 p-[28px] rounded-[6px] border border-gray20 bg-white">
          {LOCATION.map((item: string, index: number) => (
            <React.Fragment key={index}>
              <p
                role="button"
                className="hover:bg-gray10 hover:font-bold cursor-pointer"
                onClick={() => handleLocationClick(item)}
              >
                {item}
              </p>
            </React.Fragment>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-[8px] gap-y-[15px]">
          {localAddress.map((item: string, index) => (
            <React.Fragment key={index}>
              <div className="flex py-[6px] px-[10px] justify-center items-center gap-1 rounded-[20px] bg-red10">
                <span className="text-[14px] font-bold text-primary">{item}</span>
                <Image
                  onClick={() => handleRemoveLocation(item)}
                  src="/icons/close_primary.svg"
                  alt="닫기 버튼"
                  width={16}
                  height={16}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <hr className="h-[2px] self-stretch border-gray10" />
      <Input
        variant="date"
        name="startsAtGte"
        label="시작일"
        className="w-full"
        onChange={handleInputChange}
        value={startsAtGte}
      />
      <hr className="h-[2px] self-stretch border-gray10" />
      <div className="flex justify-center items-center">
        <Input
          variant="unit"
          name="hourlyPayGte"
          unitLabel="원"
          label="가격"
          className="w-[169px]"
          onChange={handleInputChange}
          value={hourlyPayGte}
        />
        <span className="ml-3 mt-5">이상부터</span>
      </div>
      <hr className="h-[2px] self-stretch border-gray10" />
      <div className="flex items-start gap-2 w-full md:mt-[16px]">
        <Button color="noFilled" className="w-[30%]" onClick={handleClear}>
          초기화
        </Button>
        <Button color="filled" className="w-[70%]" onClick={handleApply}>
          적용하기
        </Button>
      </div>
    </div>
  );
};

export default DetailedFilter;
