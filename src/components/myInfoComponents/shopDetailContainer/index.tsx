'use client';

import { useEffect } from 'react';
import MyShopInfo from '@/components/myInfoComponents/myShopInfo';
import NoticeAssignShop from '@/components/noticeComponents/noticeAssignShop';
import NoticeAssignPost from '@/components/noticeComponents/noticeAssignPost';
import { useSuspenseQuery, useInfiniteQuery } from '@tanstack/react-query';
import getShopDetail from '@/apis/shop/shopDetail';
import getMyNotices from '@/apis/notice/myNotice';
import { NoticesResponse } from '@/types/myNoticeData';
import { useInView } from 'react-intersection-observer';
import { isPastTimeKST } from '@/utils/dateTimeFormat';
import MyPostInfo from '../myPostInfo';

interface ShopDetailContainerProps {
  shopId?: string;
}

const ShopDetailContainer = ({ shopId }: ShopDetailContainerProps) => {
  const { data: myShopData } = shopId
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useSuspenseQuery({
        queryKey: ['shopDetail', shopId],
        queryFn: () => getShopDetail(shopId),
      })
    : { data: null }; // shopId가 없을 때 data는 null로 설정

  const {
    data: myNoticeData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['myNotices', shopId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!shopId) throw new Error('Shop ID is required'); // shopId가 없을 때 오류 발생
      const response = await getMyNotices(shopId, pageParam);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: NoticesResponse | undefined) => {
      if (!lastPage) return undefined;
      const items = lastPage.items ?? [];
      if (items.length === 0) return undefined;
      const nextOffset = lastPage.offset + items.length;
      return lastPage.hasNext ? nextOffset : undefined;
    },
    enabled: !!shopId,
  });

  // useInView 훅을 사용하여 마지막 요소를 관찰합니다.
  const { ref: lastElementRef, inView } = useInView({
    threshold: 1, // 100%가 뷰포트에 들어와야 호출
    triggerOnce: false, // 페이지 로드 시 한 번만 호출되지 않도록 설정
  });

  // inView가 true일 때 다음 페이지를 로드합니다.
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      <div className="flex  px-[12px] py-[40px] md:px-[32px] md:py-[60px] lg:px-[400px] lg:py-[60px] flex-col items-start gap-[8px]">
        <div className="flex-col w-[100%]">
          <span className="text-black font-bold text-[20px] md:text-[28px]">내 가게</span>
          {shopId && myShopData ? (
            <MyShopInfo shopInfo={myShopData.item} shopId={shopId} />
          ) : (
            <NoticeAssignShop />
          )}
        </div>
      </div>
      {shopId && (
        <div className="flex  px-[12px] pt-[40px] pb-[80px] md:px-[32px] md:pt-[60px] md:pb-[120px] lg:px-[400px]  flex-col items-start gap-[8px]">
          <div className="flex-col w-[100%] gap-[16px] md:gap-[32px]">
            <span className="text-black font-bold text-[20px] md:text-[28px]">
              {myNoticeData?.pages[0].count !== 0 ? '내가 등록한 공고' : '등록한 공고'}
            </span>
            {myNoticeData?.pages[0].count !== 0 ? (
              <div className="grid grid-cols-2 gap-x-[9px] gap-y-[16px] md:gap-x-[14px] md:gap-y-[32px] lg:grid-cols-3">
                {myNoticeData?.pages
                  .flatMap((page) => page.items)
                  .map((notice) => (
                    <MyPostInfo
                      key={notice.item.id}
                      noticeData={notice.item}
                      deadline={isPastTimeKST(notice.item.startsAt) || notice.item.closed}
                      shopId={shopId}
                    />
                  ))}
                {isFetchingNextPage && <div>Loading more...</div>}
                {/* 감지할 마지막 요소 */}
                <div ref={lastElementRef} />
              </div>
            ) : (
              <NoticeAssignPost />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDetailContainer;
