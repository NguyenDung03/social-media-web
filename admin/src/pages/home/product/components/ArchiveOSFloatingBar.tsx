import { motion, AnimatePresence } from "framer-motion";
import { ArrowClockwise, Trash, X } from "@phosphor-icons/react";
interface ArchiveOSFloatingBarProps {
  selectedIds: string[];
  onRestoreMultiple: () => void;
  onHardDeleteMultiple: () => void;
  onClearSelection: () => void;
}
const ArchiveOSFloatingBar: React.FC<ArchiveOSFloatingBarProps> = ({
  selectedIds,
  onRestoreMultiple,
  onHardDeleteMultiple,
  onClearSelection,
}) => {
  return (
    <AnimatePresence>
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-8 left-1/2 z-[100] w-[calc(100%-3rem)] max-w-[550px]"
        >
          <div className="bg-[#111111] text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 border-r border-white/20 pr-6">
              <div className="w-6 h-6 bg-white text-[#111111] rounded-full flex items-center justify-center text-[10px] font-bold font-mono">
                {selectedIds.length.toString().padStart(2, "0")}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ABABAB]">
                Đã chọn
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={onRestoreMultiple}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#ABABAB] transition-colors"
              >
                <ArrowClockwise size={14} weight="bold" /> Khôi phục
              </button>
              <button
                onClick={onHardDeleteMultiple}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FDEBEC] hover:text-[#9F2F2D] transition-colors"
              >
                <Trash size={14} weight="bold" /> Xóa
              </button>
            </div>
            <button
              onClick={onClearSelection}
              className="w-8 h-8 flex items-center justify-center text-[#787774] hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ArchiveOSFloatingBar;
