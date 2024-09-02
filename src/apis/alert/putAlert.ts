import axios from 'axios';
import { ReadAlertData, ReadAlertResponse } from '@/types/alertRead';

const readAlert = async ({ userId, alertId, token }: ReadAlertData): Promise<ReadAlertResponse> => {
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/alerts/${alertId}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default readAlert;
