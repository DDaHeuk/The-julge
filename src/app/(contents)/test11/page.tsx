'use client';

import NavigationBar from '@/components/navigationBar';
import { useState } from 'react';

export default function test11() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [isNotification, setIsNotification] = useState<boolean>(false);

  return <NavigationBar isAuthorized={isAuthorized} isNotification={isNotification} />;
}
