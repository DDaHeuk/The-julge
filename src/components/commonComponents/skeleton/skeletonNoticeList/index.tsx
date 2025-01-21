const SkeletonCard = () => {
  return (
    <div className="flex flex-col gap-[12px] p-[16px] rounded-[12px] border border-gray20 bg-white animate-pulse">
      <div className="h-[171px] lg:h-[160px] bg-gray50 rounded-[12px]" />
      <div className="h-[20px] w-[60%] bg-gray50 rounded-[8px]" />
      <div className="h-[14px] w-[80%] bg-gray50 rounded-[8px]" />
      <div className="h-[14px] w-[50%] bg-gray50 rounded-[8px]" />
      <div className="h-[20px] w-[70%] bg-gray50 rounded-[8px]" />
    </div>
  );
};

interface SkeletonListProps {
  number: number;
}

const SkeletonList = ({ number }: SkeletonListProps) => {
  return (
    <div className="flex flex-col md:px-[32px] lg:px-[400px] pt-[40px] md:pt-[60px] pb-[80px] md:pb-[60px] items-center w-full gap-6">
      <div className="flex items-center justify-between w-full px-6">
        <div className="w-48 h-8 rounded-md" />
        <div className="w-20 h-8 rounded-md" />
      </div>
      <div className="grid grid-cols-2 gap-4 w-full px-6">
        {Array.from({ length: number }).map((_, index) => (
          /* eslint-disable-next-line react/no-array-index-key */
          <SkeletonCard key={index} />
        ))}
      </div>
      <div className="mt-8 w-full flex justify-center">
        <div className="w-32 h-8 rounded-md" />
      </div>
    </div>
  );
};

export default SkeletonList;
