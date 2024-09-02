'use client';

import Button from '../button';

interface StateProp {
  stat: string;
  type?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
}

function Status({ stat, type, onAccept, onReject, onCancel }: StateProp) {
  let bgClass = '';
  let textClass = '';
  let status = '';

  switch (stat) {
    case 'accepted':
      bgClass = 'bg-blue10';
      textClass = 'text-blue20';
      status = '승인 완료';
      break;
    case 'pending':
      bgClass = 'bg-green10';
      textClass = 'text-green20';
      status = '대기중';
      break;
    case 'rejected':
      bgClass = 'bg-red10';
      textClass = 'text-red40';
      status = '거절';
      break;
    case 'canceled':
      bgClass = 'bg-red10';
      textClass = 'text-red40';
      status = '취소';
      break;
    default:
      bgClass = 'bg-gray10'; // 기본 상태 클래스 (필요에 따라 수정)
      textClass = 'text-gray20';
      status = '거절';
  }
  return (
    <div className="flex items-center">
      {type === 'employee' ? (
        <>
          {stat !== 'pending' && (
            <span
              className={`${bgClass} ${textClass} px-[10px] py-[6px] justify-center items-center rounded-[20px] leading-[16px] md:font-bold`}
            >
              {status}
            </span>
          )}
          {stat === 'pending' && (
            <div className="flex w-full gap-2">
              <Button type="button" onClick={onCancel} color="noFilled" className="w-full h-[32px]">
                공고 취소
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          {stat !== 'pending' && (
            <span
              className={`${bgClass} ${textClass} px-[10px] py-[6px] justify-center items-center rounded-[20px] leading-[16px] md:font-bold`}
            >
              {status}
            </span>
          )}
          {stat === 'pending' && (
            <div className="flex w-full gap-2">
              <Button
                type="button"
                onClick={onAccept}
                color="noFilled"
                className="w-[50%] h-[32px]"
              >
                수락
              </Button>
              <Button type="button" onClick={onReject} color="filled" className="w-[50%] h-[32px]">
                거절
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Status;
