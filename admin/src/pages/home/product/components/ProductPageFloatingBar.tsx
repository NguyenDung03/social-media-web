import { motion, AnimatePresence } from "framer-motion";
import { Archive, TrashSimple } from "@phosphor-icons/react";

interface ProductPageFloatingBarProps {
  selectedIds: string[];
  activeTab: "current" | "archive";
  onSoftDeleteMultiple: () => void;
  onRestoreMultiple: () => void;
  onHardDeleteMultiple: () => void;
  onClearSelection: () => void;
}

const ProductPageFloatingBar: React.FC<ProductPageFloatingBarProps> = ({
  selectedIds,
  activeTab,
  onSoftDeleteMultiple,
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
          className="fixed bottom-8 left-1/2 bg-[#111111] text-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-8 z-50 border border-white/10"
        >
          <div className="flex items-center gap-3">
            <span className="size-6 rounded-full bg-[#1F6C9F] flex items-center justify-center text-[10px] font-bold">
              {selectedIds.length}
            </span>
            <span className="text-sm font-medium">Sản phẩm đã chọn</span>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <div className="flex items-center gap-5">
            {activeTab === "current" ? (
              <>
                <button
                  onClick={onSoftDeleteMultiple}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#1F6C9F] transition-colors"
                >
                  <Archive size={16} /> Lưu trữ
                </button>
                <button
                  onClick={onSoftDeleteMultiple}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FDEBEC] hover:text-[#9F2F2D] transition-colors"
                >
                  <TrashSimple size={16} /> Xóa
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onRestoreMultiple}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#1F6C9F] transition-colors"
                >
                  <Archive size={16} /> Khôi phục
                </button>
                <button
                  onClick={onHardDeleteMultiple}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FDEBEC] hover:text-[#9F2F2D] transition-colors"
                >
                  <TrashSimple size={16} /> Xóa vĩnh viễn
                </button>
              </>
            )}
            <button
              onClick={onClearSelection}
              className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold uppercase hover:bg-white/20 transition-colors"
            >
              Hủy
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductPageFloatingBar;
