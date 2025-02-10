'use client';

import useAssignNotice from '@/hooks/useAssignNoticeMutation';
import Button from '@/components/commonComponents/button';
import useStoreNoticeInfo from '@/stores/storeNoticeInfo';
import useEditNotice from '@/hooks/useEditNoticeMutation';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import { validateNoticeData } from '@/utils/validation';
import NoticeCost from './noticeCost';
import NoticeDate from './noticeDate';
import NoticeWorkHour from './noticeWorkHour';
import NoticeDescription from './noticeDescription';

interface ManageNoticeInfoProps {
  token: string | undefined;
  shopId?: string | undefined;
  noticeId?: string | undefined;
  manageType: '등록' | '편집';
}

const ManageNoticeInfo = ({ token, manageType, shopId, noticeId }: ManageNoticeInfoProps) => {
  const { mutate: assignNotice, isPending: isAssigning } = useAssignNotice();
  const { mutate: editNotice, isPending: isEditing } = useEditNotice();
  const isLoading = isAssigning || isEditing;

  const { noticeData } = useStoreNoticeInfo();

  useBeforeUnload();

  const handleSubmitNotice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manageType === '등록') {
      assignNotice({ assignNoticeInfo: noticeData, token });
    } else {
      editNotice({ data: noticeData, shopId, noticeId, token });
    }
  };

  return (
    <form onSubmit={handleSubmitNotice} className="flex flex-col gap-[20px] md:gap-[24px] w-[100%]">
      <div className="inline-flex flex-col lg:flex-row items-start gap-[20px]">
        <div className="w-[100%] lg:w-[66.9%] flex flex-col md:flex-row gap-[20px]">
          <NoticeCost />
          <NoticeDate />
        </div>
        <NoticeWorkHour />
      </div>
      <NoticeDescription />
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-[100%] md:w-[312px]"
          color="filled"
          disabled={validateNoticeData(noticeData) || isLoading}
          pending={isLoading}
        >
          {`${manageType}하기`}
        </Button>
      </div>
    </form>
  );
};
export default ManageNoticeInfo;
