import axios from 'axios';
import { UserInfoData } from '@/types/userInfoData';

const getUserInfo = async (userId: string): Promise<UserInfoData> => {
  try {
    const response = await axios.get<UserInfoData>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default getUserInfo;
