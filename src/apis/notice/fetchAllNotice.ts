import axios from 'axios';

interface FetchAllNoticeProps {
  offset: number;
  limit: number;
}

const FetchAllNotice = async ({ offset, limit }: FetchAllNoticeProps) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notices`, {
    params: {
      offset,
      limit,
    },
  });
  return response.data;
};
export default FetchAllNotice;
