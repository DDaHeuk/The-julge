'use client';
import { LOCATION } from '@/constant/location';
import DropDown from '../dropdown';
import Input from '../input';
import Button from '@/components/button';
import { ChangeEvent, useState } from 'react';
import useAssignProfile from '@/hooks/useAssignProfileMutation';
import { useSearchParams } from 'next/navigation';

const AssignMyProfileInfo = () => {
  const searchParams = useSearchParams();
  const [assignProfileInfo, setAssignProfileInfo] = useState({
    name: searchParams.get('name') ?? '',
    phone: searchParams.get('phone') ?? '',
    address: searchParams.get('address') ?? LOCATION[0],
    bio: searchParams.get('bio') ?? '',
  });

  const { mutate: assignProfile } = useAssignProfile();

  //Input 컴포넌트에 관한 데이터 저장
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssignProfileInfo({
      ...assignProfileInfo,
      [name]: value,
    });
  };

  //드롭다운 컴포넌트에 관한 데이터 저장
  const handleDropDownChange = (name: string, value: string) => {
    setAssignProfileInfo({
      ...assignProfileInfo,
      [name]: value,
    });
  };

  //textarea 컴포넌트에 관한 데이터 저장
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignProfileInfo({
      ...assignProfileInfo,
      [name]: value,
    });
  };

  //테스트용 함수
  const testFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    assignProfile(assignProfileInfo);
  };

  return (
    <form onSubmit={testFunc} className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
      {/* 이름 + 연락처 + 선호지역 */}
      <div className="inline-grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:grid-cols-3">
        <Input
          className="w-[100%]"
          variant="normal"
          name="name"
          label="이름*"
          value={assignProfileInfo.name}
          onChange={handleInputChange}
        />
        <Input
          className="w-[100%]"
          variant="normal"
          name="phone"
          label="연락처*"
          value={assignProfileInfo.phone}
          onChange={handleInputChange}
        />
        <div className={`flex flex-col gap-2`}>
          <p>선호 지역</p>
          <DropDown
            menuItems={LOCATION}
            initialValue={assignProfileInfo.address}
            className="w-[100%] text-[16px] bg-white h-[58px] border rounded-[6px] border-gray30 py-[16px] px-[20px]"
            onSelect={(value) => handleDropDownChange('address', value)}
          />
        </div>
      </div>

      {/* 알바님 소개 */}
      <div className="inline-flex flex-col items-start gap-[8px]">
        <span className="text-black text-[16px]">소개</span>
        <textarea
          placeholder="입력"
          name="bio"
          value={assignProfileInfo.bio}
          className="flex resize-none h-[153px] px-[20px] py-[16px] items-start self-stretch rounded-[5px] border border-gray30 bg-white "
          onChange={handleTextAreaChange}
        />
      </div>

      {/* 등록 버튼 */}
      <div className="flex justify-center mt-[4px] md:mt-[8px]">
        <Button type="submit" className="w-[100%] md:w-[312px]" color="filled">
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default AssignMyProfileInfo;
