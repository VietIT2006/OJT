type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-[1px] border border-[#d9d9d9] px-3 py-2 text-sm text-[#5a5a5a] disabled:opacity-50"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`rounded-[1px] border px-3 py-2 text-sm ${
            page === currentPage
              ? "border-[#c71c1c] bg-[#c71c1c] text-white"
              : "border-[#d9d9d9] text-[#5a5a5a] hover:border-[#c71c1c] hover:text-[#c71c1c]"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-[1px] border border-[#d9d9d9] px-3 py-2 text-sm text-[#5a5a5a] disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
