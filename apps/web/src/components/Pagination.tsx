import { useState } from 'react';

export default function Pagination ({
  pageNumber,
  setPageNumber,
  totalPages
  } : {
  pageNumber: number,
  setPageNumber: (value: number) => void,
  totalPages: number }) {

  const handlePageClick = (page: number) => {
    setPageNumber(page);
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (pageNumber <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (pageNumber >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3,totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', pageNumber - 1, pageNumber, pageNumber + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        disabled={pageNumber === 1}
        onClick={() => handlePageClick(pageNumber - 1)}
        className="px-3 py-1 bg-gray-200 rounded cursor-pointer transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ←
      </button>

      {getVisiblePages().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded cursor-pointer transition hover:brightness-90 ${page === pageNumber ? 'bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B] text-white' : 'bg-gray-100'
              }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        )
      )}

      <button
        disabled={pageNumber === totalPages}
        onClick={() => handlePageClick(pageNumber + 1)}
        className="px-3 py-1 bg-gray-200 rounded cursor-pointer transition hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};
