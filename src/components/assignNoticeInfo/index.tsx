import Input from '../input';

const AssignNoticeInfo = () => {
  return (
    <div className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
      <div className="hidden lg:inline-flex items-start gap-[20px]">
        <Input className="w-[100%]" variant="normal" label="시급" />
        <Input className="w-[100%]" variant="normal" label="시작 일시" />
        <Input className="w-[100%]" variant="normal" label="업무 시간" />
      </div>

      <div className="hidden md:inline-flex lg:hidden flex-col items-start gap-[20px]">
        <div className="inline-flex items-start gap-[20px] w-[100%]">
          <Input className="w-[100%]" variant="normal" label="시급" />
          <Input className="w-[100%]" variant="normal" label="시작 일시" />
        </div>
        <div className="inline-flex items-start gap-[20px] w-[100%]">
          <Input className="w-[100%]" variant="normal" label="업무 시간" />
          <div className="w-[100%]" />
        </div>
      </div>

      <div className="md:hidden inline-flex flex-col items-start gap-[20px]">
        <Input className="w-[100%]" variant="normal" label="시급" />
        <Input className="w-[100%]" variant="normal" label="시작 일시" />
        <Input className="w-[100%]" variant="normal" label="업무 시간" />
      </div>

      <div className="inline-flex flex-col items-start gap-[8px]">
        <span className="text-black text-[16px]">공고 설명</span>
        <textarea
          placeholder="입력"
          className="flex resize-none h-[153px] px-[20px] py-[16px] items-start self-stretch rounded-[5px] border border-gray30 bg-white "
        />
      </div>
    </div>
  );
};
export default AssignNoticeInfo;
