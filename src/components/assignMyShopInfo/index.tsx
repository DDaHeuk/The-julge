/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { FOOD_CATEGORIES } from '@/types/foodCategory';
import LOCATION from '@/constant/location';
import imageUpload from '@/apis/imageUpload/imageUpload';
import Button from '@/components/button';
import useAssignShop from '@/hooks/useAssignShopMutation';
import DropDown from '../dropdown';
import Input from '../input';

const AssignMyShopInfo = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [assignShopInfo, setAssignShopInfo] = useState({
    name: '',
    category: FOOD_CATEGORIES[0],
    address1: LOCATION[0],
    address2: '',
    description: '',
    imageUrl: '',
    originalHourlyPay: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: assignShop } = useAssignShop();

  // Input 컴포넌트에 관한 데이터 저장
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssignShopInfo({
      ...assignShopInfo,
      [name]: value,
    });
  };

  // 드롭다운 컴포넌트에 관한 데이터 저장
  const handleDropDownChange = (name: string, value: string) => {
    setAssignShopInfo({
      ...assignShopInfo,
      [name]: value,
    });
  };

  // textarea 컴포넌트에 관한 데이터 저장
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignShopInfo({
      ...assignShopInfo,
      [name]: value,
    });
  };

  // 테스트용 함수
  const testFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    assignShop(assignShopInfo);
  };

  // 이미지 부분 클릭시
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일이 선택된 경우, 이미지 업로드 처리
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await imageUpload(file);
        setImageUrl(url);
        setAssignShopInfo({
          ...assignShopInfo,
          imageUrl: url,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <form onSubmit={testFunc} className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
      {/* 가게 이름 + 분류 input */}
      <div className="inline-flex flex-col md:flex-row items-start gap-[20px]">
        <Input
          className="w-[100%]"
          variant="normal"
          name="name"
          label="가게 이름"
          onChange={handleInputChange}
        />
        <div className="flex flex-col items-start gap-[8px] w-[100%]">
          <p>분류</p>
          <DropDown
            menuItems={FOOD_CATEGORIES}
            className="w-[100%] bg-white h-[58px] border rounded-[6px] border-gray30 py-[16px] px-[20px]"
            onSelect={(value) => handleDropDownChange('category', value)}
          />
        </div>
      </div>
      {/* 가게 이름 + 분류 input */}

      {/* 주소 + 상세주소 + 기본시급에 관한 input 테블릿,PC버전 */}
      <div className="inline-flex flex-col items-start gap-[20px]">
        <div className="w-[100%]  flex flex-col md:flex-row gap-[20px]">
          <div className="flex flex-col items-start gap-[8px] w-[100%]">
            <p>주소</p>
            <DropDown
              menuItems={LOCATION}
              className="w-[100%] bg-white h-[58px] border rounded-[6px] border-gray30 py-[16px] px-[20px]"
              onSelect={(value) => handleDropDownChange('address1', value)}
            />
          </div>
          <Input
            className="w-[100%] "
            variant="normal"
            name="address2"
            label="상세주소"
            onChange={handleInputChange}
          />
        </div>
        <Input
          className="w-full md:w-[49%]"
          variant="unit"
          name="originalHourlyPay"
          unitLabel="원"
          label="기본 시급"
          onChange={handleInputChange}
        />
      </div>
      {/* 주소 + 상세주소 + 기본시급에 관한 input 테블릿,PC버전 */}

      {/* 이미지 업로드 */}
      <div className="inline-flex flex-col items-start gap-[8px] md:w-[49%]">
        <span className="text-black text-[16px]">가게 이미지</span>
        <div
          className="cursor-pointer rounded-[12px] border border-gray30 bg-gray10 w-[100%] h-[200px] py-[68px]"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={handleImageClick}
        >
          {!imageUrl && (
            <div className="flex flex-col items-center gap-[11px] justify-center h-full">
              <Image src="/icons/camera.svg" alt="카메라 아이콘" width={32} height={32} />
              <span className="text-gray40 text-center text-[16px] font-bold">이미지 추가하기</span>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      {/* 이미지 업로드 */}

      {/* 가게 설명 */}
      <div className="inline-flex flex-col items-start gap-[8px]">
        <span className="text-black text-[16px]">가게 설명</span>
        <textarea
          placeholder="입력"
          name="description"
          className="flex resize-none h-[153px] px-[20px] py-[16px] items-start self-stretch rounded-[5px] border border-gray30 bg-white "
          onChange={handleTextAreaChange}
        />
      </div>
      {/* 가게 설명 */}

      {/* 등록 버튼 */}
      <div className="flex justify-center">
        <Button type="submit" className="w-[100%] md:w-[312px]" color="filled">
          등록하기
        </Button>
      </div>
      {/* 등록 버튼 */}
    </form>
  );
};

export default AssignMyShopInfo;
