/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import imageUpload from '@/apis/imageUpload/imageUpload';
import useStoreShopInfo from '@/stores/storeShopInfo';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';

const ShopImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { shopData, setShopData } = useStoreShopInfo();

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
        setShopData({ imageUrl: url });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-[8px] md:w-[49%]">
      <span className="text-black text-[16px]">가게 이미지</span>
      <div
        className="relative cursor-pointer rounded-[12px] border border-gray30 bg-gray10 w-[100%] h-[200px] py-[68px]"
        onClick={handleImageClick}
      >
        {shopData.imageUrl ? (
          <Image
            src={shopData.imageUrl}
            alt={`${shopData.imageUrl} 이미지`}
            sizes="(min-width: 1440px) 100vw, (min-width: 744px) 50vw, 33vw"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-[12px]"
          />
        ) : (
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
  );
};

export default ShopImage;
