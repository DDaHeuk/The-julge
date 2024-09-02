import axios from 'axios';

interface FetchNoticeDetailProps {
  shopId: string;
  token: string | undefined;
  noticeId: string;
}

const fetchNoticeDetail = async ({ shopId, noticeId, token }: FetchNoticeDetailProps) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}/notices/${noticeId}`,
    token ? config : undefined, // token이 없을 경우 config를 생략
  );

  return response.data;
};
export default fetchNoticeDetail;
