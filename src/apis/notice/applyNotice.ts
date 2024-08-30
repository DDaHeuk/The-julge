import axios from 'axios';

interface ApplyNoticeProps {
  shopId: string;
  noticeId: string;
  token: string | undefined;
}
const applyNotice = async ({ shopId, noticeId, token }: ApplyNoticeProps) => {
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}/notices/${noticeId}/applications`,
      '', // postman 에서 Body 값을 주지 않아도 되었지만, 아무 값이라도 넣어야 오류가 안남.
      {
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
export default applyNotice;
