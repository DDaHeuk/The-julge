import axios from 'axios';
import { AssignShopInfoData } from '@/types/assignShopInfoData';

interface ApplyShopProps {
  assignShopInfo: AssignShopInfoData;
  token: string | undefined;
}
const assignShop = async ({ assignShopInfo, token }: ApplyShopProps) => {
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops`,
      assignShopInfo,
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

export default assignShop;
