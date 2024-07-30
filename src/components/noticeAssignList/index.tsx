const NoticeAssignList = () => {
  return (
    <div className="flex flex-col justify-center items-center rounded-[12px] border-gray20 border gap-[16px] md:gap-[24px] py-[60px]  px-[24px] mt-[16px] md:mt-[32px]">
      <span className=" self-stretch text-black text-[14px] md:text-[16px] text-center">
        아직 신청 내역이 없어요.
      </span>
      <button
        type="button"
        className="flex w-[140px] h-[37px] md:w-[380px] md:h-[47px] justify-center items-center rounded-[6px] bg-[#EA3C12] px-[20px] py-[10px] md:px-[136px] md:py-[14px] text-white font-bold text-center text-[14px] md:text-[16px]"
      >
        공고 보러가기
      </button>
    </div>
  );
};

export default NoticeAssignList;
