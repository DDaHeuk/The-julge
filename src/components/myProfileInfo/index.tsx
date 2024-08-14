import Image from 'next/image';
import { AssignProfileResponse as ProfileDetailData } from '@/types/assignProfileInfoData';
import { formatPhoneNumber } from '@/utils/phoneUtils';

interface MyProfileInfoProps {
  profileInfo: ProfileDetailData['item'];
}
const MyProfileInfo = ({ profileInfo }: MyProfileInfoProps) => {
  return (
    <div className="flex flex-col p-[20px] lg:w-[665px] md:p-[32px] items-start gap-[8px] rounded-[12px] bg-red10 mt-[16px] md:mt-[24px] lg:mt-[0px]">
      <div className="flex items-start self-stretch">
        <div className="flex flex-col md:w-[392px] items-start gap-[28px] flex-1">
          <div className="flex flex-col items-start gap-[12px]">
            <div className="flex flex-col items-start gap-[8px]">
              <span className="text-[14px] text-primary font-bold leading-normal">이름</span>
              <span className="text-[24px] text-black font-bold leading-normal tracking-[0.48px]">
                {profileInfo.name}
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
                <div className="w-[11.2px] h-[16px] md:w-[14px] md:h-[20px] rounded-[2px] bg-red30 mx-auto flex justify-center items-center">
                  <div className="w-[8px] h-[11.2px] md:w-[10px] md:h-[14px] bg-white"></div>
                </div>
              </div>
              <span className="text-gray50 text-[14px] md:text-[16px] leading-[22px]">
                {profileInfo.phone}
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              <Image
                className="md:w-[20px] md:h-[20px]"
                src="/icons/marker.svg"
                alt="마커 아이콘"
                width={16}
                height={16}
              />
              <span className="text-gray50 text-[14px] md:text-[16px] leading-[22px]">
                선호 지역: {formatPhoneNumber(profileInfo.address)}
              </span>
            </div>
          </div>

          <p>{profileInfo.bio}</p>
        </div>
        <button
          type="button"
          className="flex justify-center items-center  px-[20px] md:px-[52px] py-[10px] md:py-[14px] bg-white border border-primary  rounded-[6px] text-primary font-bold text-[14px] md:text-[16px] gap-[8px] whitespace-nowrap"
        >
          편집하기
        </button>
      </div>
    </div>
  );
};

export default MyProfileInfo;
