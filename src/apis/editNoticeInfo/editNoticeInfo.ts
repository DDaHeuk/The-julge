import axios from 'axios';
import { AssignNoticeInfoData } from '@/types/assignNoticeInfoData';

const editNotice = async (
  data: AssignNoticeInfoData,
  shopId: string,
  noticeId: string,
  token: string | undefined,
) => {
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}/notices/${noticeId}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default editNotice;
