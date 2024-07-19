import Button from '@/components/button/indext';
import Input from '@/components/input';
import Image from 'next/image';

const assignMyShop = () => {
  return (
    <div className="flex px-[12px] pt-[40px] pb-[80px] flex-col items-start bg-gray5">
      <div className="flex flex-col items-center gap-[24px] w-[100%]">
        <div className="flex justify-between items-start self-stretch">
          <span className="text-black text-[20px] font-bold">가게 정보</span>
          <Image src="/icons/close.svg" alt="닫기 버튼" width={24} height={24} />
        </div>
        <div className="flex flex-col gap-[20px] w-[100%]">
          <div className="inline-flex flex-col items-start gap-[20px]">
            <Input className="w-[100%]" variant="normal" label="가게 이름" />
            <Input variant="normal" label="분류" />
          </div>
          <div className="inline-flex flex-col items-start gap-[20px]">
            <Input variant="normal" label="주소" />
            <Input variant="normal" label="상세주소" />
            <Input variant="price" label="기본 시급" />
          </div>
          <div className="inline-flex flex-col items-start gap-[8px]">
            <span className="text-black text-[16px]">가게 이미지</span>
            <div className="rounded-[12px] border border-gray-30 bg-gray10 w-[100%] h-[200px] py-[68px]">
              <div className="flex flex-col items-center  gap-[11px]">
                <Image src="/icons/camera.svg" alt="카메라 아이콘" width={32} height={32} />
                <span className="text-gray40 text-center text-[16px] font-bold">
                  이미지 추가하기
                </span>
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col items-start gap-[8px]">
            <span className="text-black text-[16px]">가게 설명</span>
            <textarea
              placeholder="입력"
              className="flex h-[153px] px-[20px] py-[16px] items-start self-stretch rounded-[5px] border border-gray-30 bg-white "
            />
          </div>
        </div>
        <Button className="w-[100%]" color="filled">
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default assignMyShop;
