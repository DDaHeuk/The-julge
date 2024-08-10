import axios from 'axios';
import { AssignProfileInfoData } from '@/types/assignProfileInfoData';

const assignProfile = async (data: AssignProfileInfoData) => {
  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('userIdStorage')!).state.userId;
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
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

export default assignProfile;
