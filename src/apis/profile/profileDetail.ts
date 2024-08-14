import { AssignProfileResponse as ProfileDetailData } from '@/types/assignProfileInfoData';
import axios from 'axios';

const getProfileDetail = async (userId: string): Promise<ProfileDetailData> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`);
  return response.data;
};
export default getProfileDetail;
