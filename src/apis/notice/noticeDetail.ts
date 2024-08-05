import axios from 'axios';

const fetchNoticeDetail = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/9032e147-f582-4a1d-b3f6-85e06b1254c2/notices/d594c985-c207-4585-ac06-48ab20f2b758`,
  );
  return response.data;
};
export default fetchNoticeDetail;
