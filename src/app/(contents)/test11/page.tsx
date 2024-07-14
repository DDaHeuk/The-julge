'use client';

import NavigationBar from '@/components/navigationBar';
import FilledButton from '@/components/button/filledButton';
import NoFilledButton from '@/components/button/noFilledButton';
import DisabledButton from '@/components/button/disabledButton';
import { useState } from 'react';
import Footer from '@/components/footer';

export default function test11() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [isNotification, setIsNotification] = useState<boolean>(false);

  return (
    <div className=" flex-col">
      <NavigationBar isAuthorized={isAuthorized} isNotification={isNotification} />
      <FilledButton width={350} name="로그인 하기" />
      <NoFilledButton width={350} name="로그인 하기" />
      <DisabledButton width={350} name="신청불가" />
      <Footer />
    </div>
  );
}
