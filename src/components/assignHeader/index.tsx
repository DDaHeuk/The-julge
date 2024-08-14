'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
}

const AssignHeader = ({ title }: HeaderProps) => {
  const router = useRouter();
  const handleClose = () => {
    router.back(); // 이전 페이지로 돌아가기
  };
  return (
    <div className="flex justify-between items-start self-stretch">
      <span className="text-black text-[20px] md:text-[28px] font-bold">{title}</span>
      <button onClick={handleClose}>
        <Image
          className="md:w-[32px] md:h-[32px]"
          src="/icons/close.svg"
          alt="닫기 버튼"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default AssignHeader;
