import { IoCaretForward, IoCaretBack } from "react-icons/io5";

interface PaginationProps {
  totalItem: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItem,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItem / itemsPerPage);

  return (
    <div className="flex items-center justify-center py-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="text-btn-bg cursor-pointer disabled:opacity-50 disabled:cursor-no-drop"
      >
        <IoCaretBack size={40} />
      </button>

      <p className="px-3 py-1 text-xl font-semibold bg-btn-bg text-btn-text rounded-lg shadow-md flex items-center justify-center">
        {currentPage}
      </p>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="text-btn-bg cursor-pointer disabled:opacity-50 disabled:cursor-no-drop"
      >
        <IoCaretForward size={40} />
      </button>
    </div>
  );
};

export default Pagination;
