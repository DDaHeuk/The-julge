'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void; // 페이지가 변경될 때 호출되는 함수
}

function Pagination2({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const [selectedPage, setSelectedPage] = useState(currentPage);
  const router = useRouter(); // useRouter 훅 사용

  const handleClick = (page: number) => {
    setSelectedPage(page);
    onPageChange(page);
    // 현재 URL에서 쿼리 파라미터 유지
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('page', String(page));

    // URL 업데이트
    router.push(currentUrl.toString()); // URL 업데이트
  };

  const handlePrevious = () => {
    if (selectedPage > 1) {
      handleClick(selectedPage - 1);
    }
  };

  const handleNext = () => {
    if (selectedPage < totalPages) {
      handleClick(selectedPage + 1);
    }
  };

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center items-center mt-4 mb-4 h-[32px] md:h-[40px] text-[14px] md:text-[16px]">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={selectedPage === 1}
        className={`mx-2 ${selectedPage === 1 ? 'text-gray40' : 'text-black'}`}
      >
        &lt;
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            type="button"
            key={page}
            onClick={() => handleClick(page)}
            className={`mx-1 px-2 py-1 rounded ${
              selectedPage === page
                ? 'w-[32px] h[32px] md:w-[40px] md:h-[40px] bg-red30 text-white'
                : 'w-[32px] h[32px] md:w-[40px] md:h-[40px] bg-transparent text-gray-600'
            }`}
          >
            {page}
          </button>
        );
      })}
      <button
        type="button"
        onClick={handleNext}
        disabled={selectedPage === totalPages}
        className={`mx-2 ${selectedPage === totalPages ? 'text-gray40' : 'text-black'}`}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination2;
