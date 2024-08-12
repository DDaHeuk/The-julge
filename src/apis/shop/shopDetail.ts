import { ShopDetailData } from '@/types/shopDetailData';
import axios from 'axios';

const getShopDetail = async (shopId: string): Promise<ShopDetailData> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}`);
  return response.data;
};
export default getShopDetail;
