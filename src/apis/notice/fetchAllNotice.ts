import axios from 'axios';

interface FetchAllNoticeProps {
  offset: number;
  limit: number;
  address?: string[] | undefined;
  keyword?: string | undefined;
  startsAtGte?: string | undefined;
  hourlyPayGte?: number | undefined;
  sort?: 'time' | 'pay' | 'hour' | 'shop' | string;
}

const FetchAllNotice = async ({
  offset,
  limit,
  address,
  keyword,
  startsAtGte,
  hourlyPayGte,
  sort,
}: FetchAllNoticeProps) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notices`, {
    params: {
      offset,
      limit,
      address,
      keyword,
      startsAtGte,
      hourlyPayGte,
      sort,
    },
  });
  return response.data;
};
export default FetchAllNotice;
