'use client';

import SkeletonList from '@/components/commonComponents/skeleton/skeletonNoticeList';

import SearchNotices from '@/components/homeComponents/searchNotices';

import { Suspense } from 'react';

export default function Results() {
  return (
    <div className=" flex-col min-h-screen">
      <div className=" flex-col min-h-[calc(100vh-126px)] md:min-h-[calc(100vh-100px)]">
        <div className="flex flex-col w-[100%]">
          <Suspense fallback={<SkeletonList number={6} />}>
            <SearchNotices />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
