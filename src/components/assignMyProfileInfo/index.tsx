import DropDown from '../dropdown';
import Input from '../input';
import Image from 'next/image';

const localList: string[] = [
  '서울특별시 송파구',
  '서울특별시 관악구',
  '서울특별시 도봉구',
  '서울특별시 용산구',
  '서울특별시 중구',
  'sdgsdg',
  'dsgsgsg',
  'dsgsgdg',
];

const AssignMyProfileInfo = () => {
  return (
    <form className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
      <div className="inline-grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:grid-cols-3">
        <Input className="w-[100%]" variant="normal" label="이름*" />
        <Input className="w-[100%]" variant="normal" label="연락처*" />
        <div className={`flex flex-col gap-2`}>
          <p>선호 지역</p>
          <DropDown menuItems={localList} />
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-[8px]">
        <span className="text-black text-[16px]">소개</span>
        <textarea
          placeholder="입력"
          className="flex resize-none h-[153px] px-[20px] py-[16px] items-start self-stretch rounded-[5px] border border-gray30 bg-white "
        />
      </div>
    </form>
  );
};

export default AssignMyProfileInfo;
