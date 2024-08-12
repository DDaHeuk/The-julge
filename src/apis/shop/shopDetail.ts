import { ShopDetailData } from '@/types/shopDetailData';
import { useShopId } from '@/stores/storeUserInfo';
import axios from 'axios';

const getShopDetail = async (): Promise<ShopDetailData> => {
  const { shopId } = useShopId();

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}`);
  return response.data;
};
export default getShopDetail;
