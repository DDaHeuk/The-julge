import axios from 'axios';

interface ApplicationData {
  applicationId: string;
  status: 'accepted' | 'rejected' | 'canceled';
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
}: ApplicationData): Promise<ApplicationResponse> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/9032e147-f582-4a1d-b3f6-85e06b1254c2/notices/d594c985-c207-4585-ac06-48ab20f2b758/applications/${applicationId}`,
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
