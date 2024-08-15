import axios from 'axios';

const FetchAllNotice = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notices`);
  return response.data;
};
export default FetchAllNotice;
