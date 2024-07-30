interface Applicant {
  name: string;
  intro: string;
  phone: string;
  status: string;
}
interface ApplicantListProps {
  data: Applicant[];
}

export default function ApplicantList({ data }: ApplicantListProps) {
  return (
    <div className="border border-gray20 rounded-xl">
      <table className="w-full">
        <thead>
          <tr className="bg-red10 border-b border-pink">
            <th className="text-left text-[12px] font-normal rounded-tl-xl px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              신청자
            </th>
            <th className="text-left text-[12px] font-normal hidden md:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              소개
            </th>
            <th className="text-left text-[12px] font-normal hidden lg:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
              전화번호
            </th>
            <th className="text-left text-[12px] font-normal rounded-tr-xl px-[8px] py-[12px] md:px-[12px] md:py-[20px]">
              상태
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.phone} className="border-b border-gray20">
              <td className="text-[14px] text-left px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {item.name}
              </td>
              <td className="text-[14px] text-left hidden md:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {item.intro}
              </td>
              <td className="text-[14px] text-left hidden lg:table-cell px-[8px] py-[12px] md:px-[12px] md:py-[20px] border-r border-gray20">
                {item.phone}
              </td>
              <td className="text-[14px] text-left px-[8px] py-[12px] md:px-[12px] md:py-[20px]">
                {item.status}
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
}
