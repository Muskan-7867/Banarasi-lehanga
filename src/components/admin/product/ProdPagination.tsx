"use client";
import React from "react";

interface ProdPaginationProps {
  totalPages: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
}

export default function ProdPagination({
  totalPages,
  handlePageChange,
  currentPage,
}: ProdPaginationProps) {
  if (totalPages <= 1) return null;

  // Function to generate visible page numbers
  const getVisiblePages = () => {
    const maxVisiblePages = 4;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than or equal to max visible, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination logic
      if (currentPage <= 2) {
        // Show first 4 pages
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        if (totalPages > maxVisiblePages) {
          pages.push("...");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 1) {
        // Show last 4 pages
        pages.push(1);
        if (totalPages > maxVisiblePages) {
          pages.push("...");
        }
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          if (i > 1) pages.push(i);
        }
      } else {
        // Show pages around current page
        pages.push(1);
        if (currentPage > 3) {
          pages.push("...");
        }

        // Show current page and neighbors
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (currentPage < totalPages - 2) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center mt-6">
      <nav
        className="inline-flex rounded-md shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Previous</span>
          &larr; Previous
        </button>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? "bg-main text-white border-main z-10"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Next</span>
          Next &rarr;
        </button>
      </nav>
    </div>
  );
}
