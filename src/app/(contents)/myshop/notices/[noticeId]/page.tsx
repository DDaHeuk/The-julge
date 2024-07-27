import ApplicantList from '@/components/applicantList';
import NoticeDetailContainer from '@/components/noticeDetailContainer';

const tableData = [
  { name: '최희문', intro: '최희문임다', phone: '010-0000-0000', status: '신청중' },
  { name: '이영희', intro: '이영희입니다', phone: '010-1111-1111', status: '대기중' },
  { name: '박철수', intro: '박철수에요', phone: '010-2222-2222', status: '완료' },
];

export default function NoticeDetailPage() {
  return (
    <div className="bg-gray5">
      <NoticeDetailContainer memberType="owner">
        <div className="flex flex-col gap-3">
          <h2 className="text-black text-5 font-bold md:text-[28px]">신청자목록</h2>
          <ApplicantList data={tableData} />
        </div>
      </NoticeDetailContainer>
    </div>
  );
}
