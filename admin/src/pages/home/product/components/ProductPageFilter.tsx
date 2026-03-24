import { motion } from "framer-motion";
import { Funnel } from "@phosphor-icons/react";

interface ProductPageFilterProps {
  activeTab: "current" | "archive";
  statusFilter: string;
  onTabChange: (tab: "current" | "archive") => void;
  onStatusFilterChange: (status: string) => void;
}

const ProductPageFilter: React.FC<ProductPageFilterProps> = ({
  activeTab,
  statusFilter,
  onTabChange,
  onStatusFilterChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 py-5 border-b border-[#EAEAEA] flex flex-col md:flex-row justify-between items-center gap-4 bg-white rounded-t-[1.5rem]"
    >
      <div className="flex bg-[#F7F6F3] p-1 rounded-xl">
        <button
          onClick={() => {
            onTabChange("current");
          }}
          className={`px-6 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === "current" ? "bg-white shadow-md text-[#111111]" : "text-[#787774] hover:text-[#111111]"}`}
        >
          Sản phẩm hiện hành
        </button>
        <button
          onClick={() => {
            onTabChange("archive");
          }}
          className={`px-6 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 ${activeTab === "archive" ? "bg-white shadow-md text-[#111111]" : "text-[#787774] hover:text-[#111111]"}`}
        >
          Kho lưu trữ
        </button>
      </div>
      <div className="flex items-center gap-3">
        {activeTab === "current" && (
          <select
            className="bg-white border border-[#EAEAEA] rounded-lg text-xs px-4 py-2.5 outline-none focus:border-[#111111] appearance-none pr-10 cursor-pointer"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Tạm ngưng</option>
          </select>
        )}
        <button className="p-2.5 border border-[#EAEAEA] rounded-lg hover:bg-[#F7F6F3] text-[#787774] transition-colors">
          <Funnel size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductPageFilter;
