import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const maxVisiblePages = 3;
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageButtons = () => {
    if (totalPages <= maxVisiblePages) {
      return pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={pageNumber === currentPage ? 'active' : ''}
        >
          {pageNumber}
        </button>
      ));
    } else {
      const startPage = Math.min(
        Math.max(1, currentPage - Math.floor(maxVisiblePages / 2)),
        totalPages - maxVisiblePages + 1
      );
      const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

      let displayedPages = [];

      if (startPage > 1) {
        displayedPages.push(
          <button
            key="1"
            onClick={() => handlePageChange(1)}
            className={1 === currentPage ? 'active' : ''}
          >
            1
          </button>
        );
      }

      if (startPage > 2) {
        displayedPages.push(
          <button key="ellipsis-start" disabled>
            ...
          </button>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        displayedPages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? 'active' : ''}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        displayedPages.push(
          <button key="ellipsis-end" disabled>
            ...
          </button>
        );
        displayedPages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={totalPages === currentPage ? 'active' : ''}
          >
            {totalPages}
          </button>
        );
      }

      return displayedPages;
    }
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      {renderPageButtons()}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
