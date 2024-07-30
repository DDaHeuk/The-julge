import axios from 'axios';

interface SignUpData {
  email: string;
  password: string;
  type: string;
}

const signUp = async (data: SignUpData): Promise<unknown> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, data);
  return response.data;
};
export default signUp;
