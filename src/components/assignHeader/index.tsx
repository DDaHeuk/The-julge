import Image from 'next/image';

interface HeaderProps {
  title: string;
}

const AssignHeader = ({ title }: HeaderProps) => {
  return (
    <div className="flex justify-between items-start self-stretch">
      <span className="text-black text-[20px] md:text-[28px] font-bold">{title}</span>
      <Image
        className="md:w-[32px] md:h-[32px]"
        src="/icons/close.svg"
        alt="닫기 버튼"
        width={24}
        height={24}
      />
    </div>
  );
};

export default AssignHeader;
