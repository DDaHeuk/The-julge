import { UserAlertResponse } from '@/types/userAlertData';
import axios from 'axios';

interface UserAlertProps {
  userId: string;
  offset: number;
}

const getUserAlert = async ({ userId, offset }: UserAlertProps): Promise<UserAlertResponse> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/alerts`,
      {
        params: {
          offset,
          limit: 6,
        },
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
export default getUserAlert;
