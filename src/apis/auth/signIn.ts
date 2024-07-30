import axios from 'axios';

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  item: {
    token: string;
  };
}

const signUp = async (data: SignInData): Promise<SignInResponse> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token`, data);
  return response.data;
};

export default signUp;
