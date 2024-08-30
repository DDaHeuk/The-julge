/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FOOD_CATEGORIES } from '@/types/foodCategory';
import LOCATION from '@/constant/location';
import imageUpload from '@/apis/imageUpload/imageUpload';

import useEditShop from '@/hooks/useEditShopMutation';
import Input from '@/components/commonComponents/input';
import Button from '@/components/commonComponents/button';
import DropDown from '../../commonComponents/dropdown';

interface EditMyShopInfoProps {
  shopId: string;
}

const EditMyShopInfo = ({ shopId }: EditMyShopInfoProps) => {
  const searchParams = useSearchParams();

  const [imageUrl, setImageUrl] = useState<string>(searchParams.get('imageUrl') ?? '');
  const [editShopInfo, setEditShopInfo] = useState({
    name: searchParams.get('name') ?? '',
    category: searchParams.get('category') ?? '',
    address1: searchParams.get('address1') ?? '',
    address2: searchParams.get('address2') ?? '',
    description: searchParams.get('description') ?? '',
    imageUrl: searchParams.get('imageUrl') ?? '',
    originalHourlyPay: Number(searchParams.get('originalHourlyPay')) ?? 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: editShop } = useEditShop();

  // Input 컴포넌트에 관한 데이터 저장
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditShopInfo({
      ...editShopInfo,
      [name]: value,
    });
  };

  // 드롭다운 컴포넌트에 관한 데이터 저장
  const handleDropDownChange = (name: string, value: string) => {
    setEditShopInfo({
      ...editShopInfo,
      [name]: value,
    });
  };

  // textarea 컴포넌트에 관한 데이터 저장
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditShopInfo({
      ...editShopInfo,
      [name]: value,
    });
  };

  // 테스트용 함수
  const testFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editShop({ data: editShopInfo, shopId });
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
        setEditShopInfo({
          ...editShopInfo,
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
          value={editShopInfo.name}
          onChange={handleInputChange}
        />
        <div className="flex flex-col items-start gap-[8px] w-[100%]">
          <p>분류</p>
          <DropDown
            menuItems={FOOD_CATEGORIES}
            className="w-[100%] bg-white h-[58px] border rounded-[6px] border-gray30 py-[16px] px-[20px]"
            onSelect={(value) => handleDropDownChange('category', value)}
            initialValue={editShopInfo.category}
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
              initialValue={editShopInfo.address1}
            />
          </div>
          <Input
            className="w-[100%] "
            variant="normal"
            name="address2"
            label="상세주소"
            value={editShopInfo.address2}
            onChange={handleInputChange}
          />
        </div>
        <Input
          className="w-full md:w-[49%]"
          variant="unit"
          name="originalHourlyPay"
          unitLabel="원"
          label="기본 시급"
          value={editShopInfo.originalHourlyPay}
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
          value={editShopInfo.description}
        />
      </div>
      {/* 가게 설명 */}

      {/* 편집 버튼 */}
      <div className="flex justify-center">
        <Button type="submit" className="w-[100%] md:w-[312px]" color="filled">
          편집하기
        </Button>
      </div>
      {/* 편집 버튼 */}
    </form>
  );
};

export default EditMyShopInfo;
