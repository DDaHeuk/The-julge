import Status from '../status';

interface StoreInfo {
  name: string;
  date: string;
  pay: string;
  status: string;
}

interface StoreInfoListProps {
  data: StoreInfo[];
}

const MyList = ({ data }: StoreInfoListProps) => {
  return (
    <div className="border border-gray20 rounded-xl mt-[16px] md:mt-[32px]">
      <table className="w-full">
        <thead>
          <tr className="bg-red10 border-b border-gray20">
            <th className="text-left text-[12px] leading-[16px] md:leading-[22px] md:text-[14px] font-normal rounded-tl-xl px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              가게
            </th>
            <th className="text-left text-[12px] leading-[16px] md:leading-[22px] md:text-[14px] font-normal hidden md:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              일자
            </th>
            <th className="text-left text-[12px] leading-[16px] md:leading-[22px] md:text-[14px] font-normal hidden lg:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              시급
            </th>
            <th className="text-left text-[12px] leading-[16px] md:leading-[22px] md:text-[14px] font-normal rounded-tr-xl px-[8px] py-[12px] md:px-[12px] md:py-[20px]">
              상태
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.pay} className="border-b border-gray20">
              <td className="text-[14px] leading-[22px] md:leading-[26px] md:text-[16px] text-left px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {item.name}
              </td>
              <td className="text-[14px] leading-[22px] md:leading-[26px] md:text-[16px] text-left hidden md:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {item.date}
              </td>
              <td className="text-[14px] leading-[22px] md:leading-[26px] md:text-[16px] text-left hidden lg:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {item.pay}
              </td>
              <td className="text-[12px] md:text-[14px] text-left px-[8px] py-[9px] md:px-[12px] md:py-[20px]">
                <Status stat={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-center">
              <div className="flex justify-center px-[12px] py-[8px]">페이지네이션부분</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MyList;
