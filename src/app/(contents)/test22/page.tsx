'use client';

import Input from '@/components/input';
import { useState } from 'react';

export default function test22() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState('');
  return (
    <div>
      <Input variant="email" />
      <Input variant="password" onChange={(e) => setPassword(e.target.value)} />
      <Input variant="passwordVerify" originalPassword={password} />
    </div>
  );
}
