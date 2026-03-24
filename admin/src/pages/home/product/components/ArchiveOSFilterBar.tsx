import { motion } from "framer-motion";
import { MagnifyingGlass, Funnel, Trash } from "@phosphor-icons/react";

interface ArchiveOSFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onDeleteMultiple: () => void;
  selectedCount: number;
}

const ArchiveOSFilterBar: React.FC<ArchiveOSFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  onDeleteMultiple,
  selectedCount,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row items-center justify-between border border-[#EAEAEA] p-2 bg-white rounded-xl gap-4"
    >
      <div className="flex items-center gap-3 flex-1 px-2 w-full">
        <MagnifyingGlass size={18} className="text-[#787774]" weight="bold" />
        <input
          className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium placeholder:text-[#ABABAB] text-[#111111]"
          placeholder="Tìm kiếm trong kho lưu trữ..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button className="flex-1 sm:flex-none px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest border border-[#EAEAEA] hover:bg-[#F7F6F3] transition-colors flex items-center justify-center gap-2 rounded-lg">
          <Funnel size={14} weight="bold" /> Bộ lọc
        </button>
        <button
          onClick={onDeleteMultiple}
          disabled={selectedCount === 0}
          className="flex-1 sm:flex-none px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-[#111111] text-white hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 rounded-lg shadow-lg shadow-[#111111]/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash size={14} weight="bold" /> Xóa tất cả
        </button>
      </div>
    </motion.div>
  );
};

export default ArchiveOSFilterBar;
