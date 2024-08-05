import axios from 'axios';

interface AssignShopInfoData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

const assignShopInfo = async (data: AssignShopInfoData) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shops`, data);
  return response.data;
};

export default assignShopInfo;
