import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setPage } from '../redux/userSlice';
import { throttle } from 'lodash';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.users
  );
  const maxVisiblePages = 10;

  // Throttled Page Change Handler
  const handlePageChange = throttle((page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setPage(page)); // Dispatch action to update the current page
    }
  }, 500);

  // Function to calculate the visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const halfRange = Math.floor(maxVisiblePages / 2);

    // If there are fewer pages than maxVisiblePages, show all pages
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // If there are more pages, calculate the range around the currentPage
    const startPage = Math.max(1, currentPage - halfRange);
    const endPage = Math.min(totalPages, currentPage + halfRange);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white'
        }`}
      >
        Prev
      </button>

      {/* Ellipsis at the beginning */}
      {visiblePages[0] > 1 && (
        <button
          disabled
          className="px-4 py-2 border bg-gray-100 text-gray-400 rounded-md cursor-default"
        >
          ...
        </button>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 border rounded-md ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis at the end */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <button
          disabled
          className="px-4 py-2 border bg-gray-100 text-gray-400 rounded-md cursor-default"
        >
          ...
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
