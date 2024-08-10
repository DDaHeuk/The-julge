import axios from 'axios';
import { AssignNoticeInfoData } from '@/types/assignNoticeInfoData';

const assignNotice = async (shopId: string, data: AssignNoticeInfoData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}/notices`,
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

export default assignNotice;
