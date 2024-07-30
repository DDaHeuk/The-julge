'use client';

interface StateProp {
  stat: string;
}

const Status = ({ stat }: StateProp) => {
  let bgClass = '';
  let textClass = '';

  switch (stat) {
    case '승인 완료':
      bgClass = 'bg-blue10';
      textClass = 'text-blue20';
      break;
    case '대기중':
      bgClass = 'bg-green10';
      textClass = 'text-green20';
      break;
    case '거절':
      bgClass = 'bg-red10';
      textClass = 'text-red40';
      break;
    default:
      bgClass = 'bg-gray10'; // 기본 상태 클래스 (필요에 따라 수정)
      textClass = 'text-gray20';
  }
  return (
    <span
      className={`${bgClass} ${textClass} px-[10px] py-[6px] justify-center items-center rounded-[20px] leading-[16px] md:font-bold`}
    >
      {stat}
    </span>
  );
};

export default Status;
