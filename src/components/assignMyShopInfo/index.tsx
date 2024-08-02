import Input from '../input';
import Image from 'next/image';
import DropDown from '../dropdown';
import { FOOD_CATEGORIES } from '@/types/foodCategory';
import { LOCATION } from '@/constant/location';

const AssignMyShopInfo = () => {
  return (
    <div className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
      {/* 가게 이름 + 분류 input */}
      <div className="inline-flex flex-col md:flex-row items-start gap-[20px]">
        <Input className="w-[100%]" variant="normal" label="가게 이름" />
        <div className="flex flex-col items-start gap-[8px] w-[100%]">
          <label>분류</label>
          <DropDown
            menuItems={FOOD_CATEGORIES}
            className="w-[100%] bg-white h-[58px] border rounded-[6px] border-gray30 py-[16px] px-[20px]"
          />
        </div>
      </div>
      {/* 가게 이름 + 분류 input */}

      {/* 주소 + 상세주소 + 기본시급에 관한 input 테블릿,PC버전 */}
      <div className="inline-flex flex-col items-start gap-[20px]">
        <div className="w-[100%]  flex flex-col md:flex-row gap-[20px]">
          <div className="flex flex-col items-start gap-[8px] w-[100%]">
            <label>주소</label>
            <DropDown
              menuItems={LOCATION}
              className="w-[100%] bg-white h-[58px] border rounded-[6px] border-gray30 py-[16px] px-[20px]"
            />
          </div>
          <Input className="w-[100%] " variant="normal" label="상세주소" />
        </div>
        <Input className="w-full md:w-[49%]" variant="unit" unitLabel="원" label="기본 시급" />
      </div>
      {/* 주소 + 상세주소 + 기본시급에 관한 input 테블릿,PC버전 */}

      <div className="inline-flex flex-col items-start gap-[8px] md:w-[49%]">
        <span className="text-black text-[16px]">가게 이미지</span>
        <div className="cursor-pointer rounded-[12px] border border-gray30 bg-gray10 w-[100%] h-[200px] py-[68px]">
          <div className="flex flex-col items-center  gap-[11px]">
            <Image src="/icons/camera.svg" alt="카메라 아이콘" width={32} height={32} />
            <span className="text-gray40 text-center text-[16px] font-bold">이미지 추가하기</span>
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-[8px]">
        <span className="text-black text-[16px]">가게 설명</span>
        <textarea
          placeholder="입력"
          className="flex resize-none h-[153px] px-[20px] py-[16px] items-start self-stretch rounded-[5px] border border-gray30 bg-white "
        />
      </div>
    </div>
  );
};

export default AssignMyShopInfo;
