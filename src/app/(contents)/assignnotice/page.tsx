import AssignHeader from '@/components/assignHeader';
import AssignNoticeInfo from '@/components/assignNoticeInfo';
import Button from '@/components/button';

const assignNotice = () => {
  return (
    <div className="flex h-screen px-[12px] md:px-[32px] lg:px-[238px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] flex-col items-start bg-gray5">
      <div className="flex flex-col items-center gap-[24px] md:gap-[32px] w-[100%]">
        <AssignHeader title="공고 등록" />
        <AssignNoticeInfo />
        <Button className="w-[100%] md:w-[312px]" color="filled">
          등록하기
        </Button>
      </div>
    </div>
  );
};
export default assignNotice;
