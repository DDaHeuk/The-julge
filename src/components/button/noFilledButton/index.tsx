interface NoFilledButtonProps {
  width: number;
  name: string;
}

const NoFilledButton = ({ width, name }: NoFilledButtonProps) => {
  return (
    <button
      type="button"
      style={{ width: `${width}px` }}
      className="bg-white border-[#EA3C12] border  h-[32px] md:h-[37px] lg:h-[48px]  rounded-[6px] text-[#EA3C12] font-bold text-[12px] md:text-[14px] lg:text-[16px] inline-flex py-[14px] justify-center items-center gap-[8px]"
    >
      {name}
    </button>
  );
};

export default NoFilledButton;
