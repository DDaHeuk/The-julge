'use client';

import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/button';
import useEditNotice from '@/hooks/useEditNoticeMutation';
import { storedDataTimeToString, dateTimeToString } from '@/utils/dateTimeFormat';
import Input from '../input';

interface EditNoticeInfoProps {
  shopId: string;
  noticeId: string;
}

const EditNoticeInfo = ({ shopId, noticeId }: EditNoticeInfoProps) => {
  const searchParams = useSearchParams();
  const { mutate: editNotice } = useEditNotice();

  const [editNoticeInfo, setEditNoticeInfo] = useState({
    hourlyPay: Number(searchParams.get('hourlyPay')) ?? 0,
    startsAt: searchParams.get('startsAt') ?? '',
    workhour: Number(searchParams.get('workhour')) ?? 0,
    description: searchParams.get('description') ?? '',
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
    editNotice({ data: editNoticeInfo, shopId, noticeId });
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
            value={editNoticeInfo.hourlyPay}
          />
          <Input
            className="w-[100%]"
            variant="dateTime"
            label="시작 일시"
            name="startsAt"
            onChange={handleInputChange}
            value={calculateDate(editNoticeInfo.startsAt)}
          />
        </div>
        <Input
          className="w-[100%] md:w-[49%] lg:w-[33.1%]"
          variant="unit"
          unitLabel="시간"
          label="업무 시간"
          name="workhour"
          onChange={handleInputChange}
          value={editNoticeInfo.workhour}
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

      {/* 등록 버튼 */}
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
