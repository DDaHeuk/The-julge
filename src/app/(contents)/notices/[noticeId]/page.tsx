import MyPost from '@/components/myPost';
import NoticeDetailContainer from '@/components/noticeDetailContainer';

export default function MyShopNoticeDetailPage() {
  return (
    <div className="bg-gray5">
      <NoticeDetailContainer memberType="employee">
        <div className="flex flex-col gap-3">
          <h2 className="text-black text-5 font-bold md:text-[28px]">최근에 본 공고이미지</h2>
          <MyPost />
        </div>
      </NoticeDetailContainer>
    </div>
  );
}
