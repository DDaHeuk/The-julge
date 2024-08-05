'use client';

import Button from '@/components/button';
import DropDown from '@/components/dropdown';
import Input from '@/components/input';
import axios from 'axios';
import { useState } from 'react';

export default function test22() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState('');

  const menuList = ['안녕', '안녕2', '메뉴3', '메뉴4', '1', '2', '3'];

  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/shops/9032e147-f582-4a1d-b3f6-85e06b1254c2/notices`,
        {
          hourlyPay: 12000,
          startsAt: '2024-08-31T12:00:00Z',
          workhour: 5,
          description: '알바 대타 구함!',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form>
      <Input variant="email" />
      <Input variant="password" onChange={(e) => setPassword(e.target.value)} />
      <Input variant="passwordVerify" originalPassword={password} className="w-[500px]" />
      <Input variant="unit" unitLabel="원" className="w-[500px]" />
      <DropDown menuItems={menuList} className="w-[500px]" />
      <Input variant="normal" className="w-[500px]" />
      <Button color="filled" onClick={handleClick}>
        요청
      </Button>
    </form>
  );
}
