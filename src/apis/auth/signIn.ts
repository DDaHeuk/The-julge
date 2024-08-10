import axios from 'axios';
import { SignInData, SignInResponse } from '@/types/signInData';

const signUp = async (data: SignInData): Promise<SignInResponse> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token`, data);
  return response.data;
};

export default signUp;
