import axios from 'axios';

interface ApplicationData {
  applicationId: string;
  status: 'accepted' | 'rejected' | 'canceled';
  shopId: string;
  noticeId: string;
  token: string | undefined;
}

export interface ApplicationResponse {
  item: {
    id: 'string';
    status: 'pending | accepted | rejected | canceled';
    createdAt: 'string';
    user: {
      item: {
        id: string;
        email: string;
        type: 'employer' | 'employee';
        name: string; // optional
        phone: string; // optional
        address: string; // optional
        bio: string; // optional
      };
      href: string;
    };
    shop: {
      item: {
        id: string;
        name: string;
        category: string;
        address1: string;
        address2: string;
        description: string;
        imageUrl: string;
        originalHourlyPay: number;
      };
      href: string;
    };
    notice: {
      item: {
        id: string;
        hourlyPay: number;
        description: string;
        startsAt: string;
        workhour: number;
        closed: boolean;
      };
      href: string;
    };
  };
}

const applicationProcess = async ({
  applicationId,
  status,
  shopId,
  noticeId,
  token,
}: ApplicationData): Promise<ApplicationResponse> => {
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default applicationProcess;
