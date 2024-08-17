'use client';

import { ChangeEvent, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Input from '../input';
import Button from '@/components/button';
import useAssignNotice from '@/hooks/useAssignNoticeMutation';
import { storedDataTimeToString, dateTimeToString } from '@/utils/dateTimeFormat';

interface EditNoticeInfoProps {
  shopId: string;
  noticeId: string;
}

interface CachedNoticeData {
  item: {
    description: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
  };
}

const EditNoticeInfo = ({ shopId, noticeId }: EditNoticeInfoProps) => {
  const queryClient = useQueryClient();
  const cachedNoticeData = queryClient.getQueryData(['noticeDetail']) as CachedNoticeData;

  // const { mutate: assignNotice } = useAssignNotice();

  const [editNoticeInfo, setEditNoticeInfo] = useState({
    hourlyPay: cachedNoticeData?.item.hourlyPay,
    startsAt: cachedNoticeData?.item.startsAt,
    workhour: cachedNoticeData?.item.workhour,
    description: cachedNoticeData?.item.description,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditNoticeInfo({
      ...editNoticeInfo,
      [name]: value,
    });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditNoticeInfo({
      ...editNoticeInfo,
      [name]: value,
    });
  };

  const handleSubmitNotice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cachedNoticeData);
    //assignNotice(editNoticeInfo);
  };

  const calculateDate = (dateTime: string) => {
    const dateObj = storedDataTimeToString(dateTime);
    return dateTimeToString(dateObj.selectedDate, dateObj.selectedTime);
  };

  return (
    <form onSubmit={handleSubmitNotice} className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
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
            value={cachedNoticeData?.item.hourlyPay}
          />
          <Input
            className="w-[100%]"
            variant="dateTime"
            label="시작 일시"
            name="startsAt"
            onChange={handleInputChange}
            value={calculateDate(cachedNoticeData?.item.startsAt)}
          />
        </div>
        <Input
          className="w-[100%] md:w-[49%] lg:w-[33.1%]"
          variant="unit"
          unitLabel="시간"
          label="업무 시간"
          name="workhour"
          onChange={handleInputChange}
          value={cachedNoticeData?.item.workhour}
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
          value={editNoticeInfo.description}
        />
      </div>
      {/* 공고 설명 */}

      {/* 등록 버튼*/}
      <div className="flex justify-center">
        <Button type="submit" className="w-[100%] md:w-[312px]" color="filled">
          편집하기
        </Button>
      </div>
      {/* 등록 버튼 */}
    </form>
  );
};
export default EditNoticeInfo;
