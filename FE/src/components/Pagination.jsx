import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className={`px-4 py-2 mx-1 border rounded-md ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="px-4 py-2">
        {currentPage} / {totalPages}
      </span>

      <button
        className={`px-4 py-2 mx-1 border rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
