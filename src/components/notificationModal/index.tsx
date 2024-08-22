/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import useAlertMutation from '@/hooks/useAlertMutation';
import { useUserId } from '@/stores/storeUserInfo';
import { NotificationItem } from '@/types/notificationItem';
import { formatTimeAgo, formatWorkSchedule } from '@/utils/dateTimeFormat';

import Image from 'next/image';

interface NotificationModalProps {
  onClose: () => void;
  notificationData: NotificationItem[];
}

const NotificationModal = ({ onClose, notificationData }: NotificationModalProps) => {
  const { userId } = useUserId();
  const { mutate: readAlert } = useAlertMutation();
  const unreadNotifications = notificationData.filter((alertItem) => !alertItem.item.read);
  const handleAllertClick = (alertId: string) => {
    console.log(alertId);
    readAlert(
      { userId, alertId },
      {
        onSuccess: () => {
          console.log('알림 읽음');
        },
      },
    );
  };

  return (
    <div className="bg-red10 fixed top-0 h-full w-full left-0 md:w-[390px] md:h-auto md:absolute md:top-[110%] md:right-0 md:left-auto z-50 flex py-[40px] px-[20px] md:py-[24px] flex-col items-start gap-[16px] rounded-[10px] md:border md:border-gray30 md:shadow-custom">
      <div className="flex justify-between items-center self-stretch">
        <p className="text-[20px] font-bold">알림 {unreadNotifications.length}개</p>
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
        {unreadNotifications.map((alertItem: any) => (
          <li
            className="flex flex-col px-[12px] py-[16px] gap-[4px] bg-white rounded-[5px] border border-gray20"
            key={alertItem.item.id}
            role="button"
            onClick={() => handleAllertClick(alertItem.item.id)}
          >
            <Image
              src={`/icons/approvalstatus/${alertItem.status === '승인 완료' ? 'approval' : 'rejection'}.svg`}
              alt="공고 상태"
              width={5}
              height={5}
            />
            <p className="text-[14px] text-black leading-[22px]">
              {alertItem.item.shop.item.name} ({' '}
              {formatWorkSchedule(
                alertItem.item.notice.item.startsAt,
                alertItem.item.notice.item.workhour,
              )}
              ) 공고 지원이{' '}
              {alertItem.item.result === 'accepted' ? (
                <span className="text-blue20">승인</span>
              ) : (
                <span className="text-red40">거절</span>
              )}
              되었어요.
            </p>
            <span className="text-gray40 text-[12px] leading-[16px]">
              {formatTimeAgo(alertItem.item.createdAt)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationModal;
