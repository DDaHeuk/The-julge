interface FilledButtonProps {
  width: number;
  name: string;
}

const FilledButton = ({ width, name }: FilledButtonProps) => {
  return (
    <button
      style={{ width: `${width}px` }}
      className="bg-[#EA3C12] h-[32px] md:h-[37px] lg:h-[48px]  rounded-[6px] text-white font-bold text-[12px] md:text-[14px] lg:text-[16px] inline-flex py-[14px] justify-center items-center gap-[8px]"
    >
      {name}
    </button>
  );
};

export default FilledButton;
