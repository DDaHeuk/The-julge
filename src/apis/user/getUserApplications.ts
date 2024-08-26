import axios from 'axios';

interface UserApplicationsProps {
  userId: string;
  offset: number;
  limit: number;
  token: string | undefined;
}

const getUserApplications = async ({ userId, offset, limit, token }: UserApplicationsProps) => {
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/applications`,
      {
        params: {
          offset,
          limit,
        },
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
export default getUserApplications;
