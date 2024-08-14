import axios from 'axios';

interface FetchNoticeApplicationProps {
  shopId: string;
  noticeId: string;
  offset: number;
  limit: number;
}
const fetchNoticeApplication = async ({
  shopId,
  noticeId,
  offset,
  limit,
}: FetchNoticeApplicationProps) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}/notices/${noticeId}/applications`,
    {
      params: {
        offset,
        limit,
      },
    },
  );
  return response.data;
};
export default fetchNoticeApplication;
