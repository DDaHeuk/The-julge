import axios from 'axios';

interface FetchNoticeDetailProps {
  shopId: string;
  noticeId: string;
}

const fetchNoticeDetail = async ({ shopId, noticeId }: FetchNoticeDetailProps) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}/notices/${noticeId}`,
  );
  return response.data;
};
export default fetchNoticeDetail;
