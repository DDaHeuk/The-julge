import fetchNoticeDetail from '@/apis/notice/noticeDetail';
import { useQuery } from '@tanstack/react-query';

const useFetchNoticeDetailData = () => {
  return useQuery({ queryKey: ['noticeDetailData'], queryFn: () => fetchNoticeDetail });
};
export default useFetchNoticeDetailData;
