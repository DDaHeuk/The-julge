'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import Input from '../input';
import Button from '@/components/button';

const AssignNoticeInfo = () => {
  const [assignNoticeInfo, setAssignNoticeInfo] = useState({
    hourlyPay: 0,
    startsAt: '',
    workhour: 0,
    description: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssignNoticeInfo({
      ...assignNoticeInfo,
      [name]: value,
    });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignNoticeInfo({
      ...assignNoticeInfo,
      [name]: value,
    });
  };

  const test = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(assignNoticeInfo);
  };

  return (
    <form onSubmit={test} className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
      {/* 시급 + 시작 일시 + 업무시간에 관한 input */}
      <div className="inline-flex flex-col lg:flex-row items-start gap-[20px]">
        <div className="w-[100%] lg:w-[66.9%] flex flex-col md:flex-row gap-[20px]">
          <Input
            className="w-[100%]"
            variant="unit"
            unitLabel="원"
            label="시급"
            name="hourlyPay"
            onChange={handleInputChange}
          />
          <Input
            className="w-[100%]"
            variant="dateTime"
            label="시작 일시"
            name="startsAt"
            onChange={handleInputChange}
          />
        </div>
        <Input
          className="w-[100%] md:w-[49%] lg:w-[33.1%]"
          variant="unit"
          unitLabel="시간"
          label="업무 시간"
          name="workhour"
          onChange={handleInputChange}
        />
      </div>
      {/* 시급 + 시작 일시 + 업무시간에 관한 input */}

      {/* 공고 설명 */}
      <div className="inline-flex flex-col items-start gap-[8px]">
        <span className="text-black text-[16px]">공고 설명</span>
        <textarea
          placeholder="입력"
          name="description"
          className="flex resize-none h-[153px] px-[20px] py-[16px] items-start self-stretch rounded-[5px] border border-gray30 bg-white "
          onChange={handleTextAreaChange}
        />
      </div>
      {/* 공고 설명 */}

      {/* 등록 버튼*/}
      <div className="flex justify-center">
        <Button type="submit" className="w-[100%] md:w-[312px]" color="filled">
          등록하기
        </Button>
      </div>
      {/* 등록 버튼 */}
    </form>
  );
};
export default AssignNoticeInfo;
