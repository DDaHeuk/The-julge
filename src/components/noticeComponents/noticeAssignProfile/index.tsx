import Link from 'next/link';

interface NoticeAssignProfileProps {
  userId: string;
}

const NoticeAssignProfile = ({ userId }: NoticeAssignProfileProps) => {
  return (
    <div className="flex flex-col justify-center items-center rounded-[12px] border-gray20 border gap-[16px] md:gap-[24px] py-[60px] px-[24px] mt-[16px] md:mt-[24px]">
      <span className=" self-stretch text-black text-[14px] md:text-[16px] text-center">
        내 프로필을 등록하고 원하는 가게에 지원해 보세요.
      </span>
      <Link
        href={`/myprofile/${userId}/assignmyprofile`}
        type="button"
        className="flex w-[150px] h-[37px] md:w-[346px] md:h-[47px] justify-center items-center rounded-[6px] bg-[#EA3C12] px-[20px] py-[10px] md:px-[136px] md:py-[14px] text-white font-bold text-center text-[14px] md:text-[16px] whitespace-nowrap"
      >
        내 프로필 등록하기
      </Link>
    </div>
  );
};

export default NoticeAssignProfile;
