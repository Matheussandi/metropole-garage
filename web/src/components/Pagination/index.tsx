interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className="mt-6 flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`mx-2 px-4 py-2 rounded border ${currentPage === index + 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-800 text-blue-500'
            }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}