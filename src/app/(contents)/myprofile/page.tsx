'use client';

import MyList from '@/components/myList';
import MyProfileInfo from '@/components/myProfileInfo';
import NoticeAssignList from '@/components/noticeAssignList';
import NoticeAssignProfile from '@/components/noticeAssignProfile';
import { useState } from 'react';

export default function myProfile() {
  const [profile, setProfile] = useState<boolean>(true);
  const [list, setList] = useState<boolean>(false);
  return (
    <div className="flex flex-col">
      <div className="flex px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px] lg:py-[60px] flex-col items-start gap-[8px]">
        <div className={`flex flex-col w-[100%] ${profile ? 'lg:flex-row justify-between' : ''}`}>
          <span className={`text-black font-bold text-[20px] md:text-[28px]`}>내 프로필</span>
          {profile ? <MyProfileInfo /> : <NoticeAssignProfile />}
        </div>
      </div>
      {profile && (
        <div
          className={`flex flex-col items-start gap-[8px] px-[12px] pt-[40px] pb-[80px] md:px-[32px] md:pt-[60px] ${list ? 'md:pb-[60px]' : 'md:pb-[120px]'} lg:px-[238px] bg-gray5`}
        >
          <div className="flex-col w-[100%] gap-[16px] md:gap-[32px]">
            <span className="text-black font-bold text-[20px] md:text-[28px]">신청 내역</span>
            {list ? <MyList /> : <NoticeAssignList />}
          </div>
        </div>
      )}
    </div>

    // <div className="flex  px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[237px] lg:py-[60px] flex-col items-start gap-[8px]">
    //   <div className="flex-col w-[100%]">
    //     <span className="text-black font-bold text-[20px] md:text-[28px] mb-[16px] md:mb-[23px]">
    //       내 프로필
    //     </span>
    //     <div className="flex flex-col justify-center items-center rounded-[12px] border-gray20 border gap-[16px] md:gap-[24px] py-[60px] px-[24px]">
    //       <span className=" self-stretch text-black text-[14px] md:text-[16px] text-center">
    //         내 프로필을 등록하고 원하는 가게에 지원해 보세요.
    //       </span>
    //       <button
    //         type="button"
    //         className="flex w-[160px] h-[37px] md:w-[400px] md:h-[47px] justify-center items-center rounded-[6px] bg-[#EA3C12] px-[20px] py-[10px] md:px-[136px] md:py-[14px] text-white font-bold text-center text-[12px] md:text-[14px]"
    //       >
    //         내 프로필 등록하기
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
