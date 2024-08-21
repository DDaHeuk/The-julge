/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import Image from 'next/image';

interface NotificationModalProps {
  onClose: () => void;
}

const tableData = [
  {
    name: 'HS 과일주스',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    pay: '15,000원',
    status: '승인 완료',
  },
  {
    name: '써니 브렌치 레스토랑',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    pay: '15,000원',
    status: '대기중',
  },
  {
    name: '수리 메스프레소 샵',
    date: '2023-01-12 10:00 ~ 12:00 (2시간)',
    pay: '15,000원',
    status: '거절',
  },
];

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  return (
    <div className="bg-red10 fixed top-0 h-full w-full left-0 md:w-[390px] md:h-auto md:absolute md:top-[110%] md:right-0 md:left-auto z-50 flex py-[40px] px-[20px] md:py-[24px] flex-col items-start gap-[16px] rounded-[10px] md:border md:border-gray30 md:shadow-custom">
      <div className="flex justify-between items-center self-stretch">
        <p className="text-[20px] font-bold">알림 6개</p>
        <Image
          onClick={() => onClose()}
          className="cursor-pointer"
          src="/icons/close.svg"
          alt="닫기 버튼"
          width={24}
          height={24}
        />
      </div>
      <ul className="flex flex-col gap-[8px]">
        {tableData.map((item: any) => (
          <li
            className="flex flex-col px-[12px] py-[16px] gap-[4px] bg-white rounded-[5px] border border-gray20"
            key={item.name}
          >
            <Image
              src={`/icons/approvalstatus/${item.status === '승인 완료' ? 'approval' : 'rejection'}.svg`}
              alt="공고 상태"
              width={5}
              height={5}
            />
            <p className="text-[14px] text-black leading-[22px]">
              {item.name}({item.date}) 공고 지원이{' '}
              {item.status === '승인 완료' ? (
                <span className="text-blue20">승인</span>
              ) : (
                <span className="text-red40">거절</span>
              )}
              되었어요.
            </p>
            <span className="text-gray40 text-[12px] leading-[16px]">3분 전</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationModal;
