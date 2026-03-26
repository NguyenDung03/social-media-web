import { motion } from "framer-motion";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
interface ProductPageHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}
const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
    >
      <div>
        <h1 className="text-4xl font-light tracking-tight text-[#111111]">
          Danh mục sản phẩm
        </h1>
        <p className="text-[#787774] mt-2 text-sm">
          Hệ điều hành kiểm kê cao cấp cho thương mại xã hội
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative group">
          <MagnifyingGlass
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#787774] size-5 transition-colors group-focus-within:text-[#111111]"
            weight="bold"
          />
          <input
            className="pl-11 pr-4 py-3 bg-white border border-[#EAEAEA] rounded-lg text-sm w-72 outline-none focus:border-[#111111] transition-all placeholder:text-[#ABABAB]"
            placeholder="Tìm kiếm ID hoặc tên..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 bg-[#111111] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#333333] transition-all active:scale-[0.98]"
        >
          <Plus size={18} weight="bold" /> Thêm sản phẩm
        </button>
      </div>
    </motion.div>
  );
};
export default ProductPageHeader;
