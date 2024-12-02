import React from 'react';
import { clsx } from 'clsx';
import Icon from '../icon/icon.component';
import './pagination.style.scss';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // Number of additional buttons to show around the current page
  centered?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
  centered = false,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Hide pagination if there is only one page
  if (totalPages <= 1) return null;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const createPageRange = () => {
    const totalDisplayedPages = siblingCount * 2 + 5; // Includes first, last, and ellipsis pages
    if (totalPages <= totalDisplayedPages) {
      return range(0, totalPages - 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 2);

    const showLeftEllipsis = leftSiblingIndex > 1;
    const showRightEllipsis = rightSiblingIndex < totalPages - 2;

    const pages: (number | string)[] = [0]; // Include first page (0 internally)

    if (showLeftEllipsis) {
      pages.push('...');
    }

    pages.push(...range(leftSiblingIndex, rightSiblingIndex));

    if (showRightEllipsis) {
      pages.push('...');
    }

    pages.push(totalPages - 1); // Include last page

    return pages;
  };

  const pages = createPageRange();

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page); // Pass zero-based page index
    }
  };

  return (
    <div
      className={clsx({
        pagination: true,
        'pagination--centered': centered,
      })}
    >
      <button disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)}>
        <Icon name={'ChevronLeft'} size={16} />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          className={currentPage === page ? 'active' : ''}
          disabled={page === '...'}
          onClick={() => handlePageClick(page)}
        >
          {typeof page === 'number' ? page + 1 : page} {/* Convert zero-based to one-based */}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name={'ChevronRight'} size={16} />
      </button>
    </div>
  );
};

export default Pagination;
