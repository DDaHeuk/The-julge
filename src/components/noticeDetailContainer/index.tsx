import Image from 'next/image';
import Button from '../button';

const tableData = [
  { name: '최희문', intro: '최희문임다', phone: '010-0000-0000', status: '신청중' },
  { name: '이영희', intro: '이영희입니다', phone: '010-1111-1111', status: '대기중' },
  { name: '박철수', intro: '박철수에요', phone: '010-2222-2222', status: '완료' },
];

export default function NoticeDetailContainer() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] md:gap-6 lg:px-[238px]">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] text-primary font-bold md:text-[16px]">식당</p>
            <h2 className="text-[20px] text-black font-bold md:text-[28px]">도토리 식당</h2>
          </div>

          <div className="w-full p-5 bg-white rounded-[12px] md:p-6">
            <div className="relative overflow-hidden w-full h-[200px]">
              <Image src="/icons/marker.svg" alt="공고이미지" fill />
            </div>
            <div className="flex flex-col gap-6 md:gap-10">
              <div className="flex flex-col gap-2 md:gap-3">
                <p className="text-[14px] text-primary font-bold md:text-[16px]">시급</p>
                <p className="text-[24px] text-black font-bold md:text-[28px]">15,000원</p>
                <div className="flex gap-[6px]">
                  <Image src="/icons/clock.svg" alt="시계 아이콘" width={20} height={20} />
                  <p className="text-[14px] text-gray50 md:text-[16px]">2000.00.00 15:00-18:00</p>
                </div>
                <div className="flex gap-[6px]">
                  <Image src="/icons/marker.svg" alt="마커 표시" width={20} height={20} />
                  <p className="text-[14px] text-gray50 md:text-[16px]">서울시 송파구</p>
                </div>
                <p className="text-[14px text-black md:text-[16px]">
                  설명입니다 길게해볼게요 설명입니다 길게해볼게요설명입니다 길게해볼게요설명입니다
                  길게해볼게요
                </p>
              </div>
              <Button type="button" className="w-full h-[38px] md:h-[48px]">
                공고 편집하기
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5 bg-gray10 rounded-xl md:p-8">
          <p className="text-[14px] text-black font-bold md:text-[16px]">공고설명</p>
          <p className="text-[14px] text-black md:text-[16px]">
            공고설명입니다공고설명입니다공고설명입니다공고설명입니다공고설명입니다공고설명입니다공고설명입니다공고설명입니다
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[238px]">
        <div className="flex flex-col gap-3">
          <h2 className="text-black text-5 font-bold md:text-[28px]">신청자목록</h2>
          <div className="border border-gray20  rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-pink border-b border-gray20">
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
                {tableData.map((item) => (
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
        </div>
      </div>
    </div>
  );
}
