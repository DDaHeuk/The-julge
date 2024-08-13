import Image from 'next/image';

interface HourpayCalcProps {
  originalPay: number;
  currentPay: number;
  deadline?: boolean;
}

export default function HourlypayCalc({
  originalPay,
  currentPay,
  deadline = false,
}: HourpayCalcProps) {
  const percentageIncrease = ((currentPay - originalPay) / originalPay) * 100;
  const formattedPercentage = percentageIncrease.toFixed(0);
  return (
    <div className="flex justify-center px-2 py-1 items-center gap-[2px] bg-primary rounded-[20px]">
      <span className={`${deadline ? 'text-gray30' : 'text-white'} text-center text-[12px]`}>
        {`기존 시급보다 ${formattedPercentage}%`}
      </span>
      <Image
        src={deadline ? '/icons/arrow-up-inactive.svg' : '/icons/arrow-up-white.svg'}
        alt="화살표 아이콘"
        width={20}
        height={20}
      />
    </div>
  );
}
