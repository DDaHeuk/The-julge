'use client';

import DropDown from '@/components/dropdown';
import Input from '@/components/input';
import { useState } from 'react';

export default function test22() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState('');

  const menuList = ['안녕', '안녕2', '메뉴3', '메뉴4'];
  return (
    <form>
      <Input variant="email" />
      <Input variant="password" onChange={(e) => setPassword(e.target.value)} />
      <Input variant="passwordVerify" originalPassword={password} />
      <Input variant="price" className="w-[500px]" />
      <DropDown menuItems={menuList} />
    </form>
  );
}
