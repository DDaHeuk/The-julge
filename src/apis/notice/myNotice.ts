import { NoticesResponse } from '@/types/myNoticeData';
import axios from 'axios';

const getMyNotices = async (shopId: string, pageParam: number): Promise<NoticesResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}/notices`,
    {
      params: {
        offset: pageParam,
        limit: 6,
      },
    },
  );
  return response.data;
};
export default getMyNotices;
