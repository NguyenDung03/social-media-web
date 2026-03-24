import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VoucherPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const VoucherPagination: React.FC<VoucherPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="flex items-center justify-between border-t border-slate-200/10 pt-6">
    <div className="flex items-center gap-6"></div>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-sm border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} className="text-slate-600" />
      </button>
      <span className="px-4 font-mono text-sm text-slate-500">
        Trang {String(currentPage).padStart(2, "0")} /{" "}
        {String(totalPages).padStart(2, "0")}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-sm border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} className="text-slate-600" />
      </button>
    </div>
  </div>
);

export default VoucherPagination;
