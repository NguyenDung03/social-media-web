import React from "react";
import { Plus } from "lucide-react";
interface VoucherHeaderProps {
  onAdd: () => void;
}
export const VoucherHeader: React.FC<VoucherHeaderProps> = ({ onAdd }) => (
  <header className="bg-white border-b rounded-[10px] border-slate-200/60 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
    <div className="flex flex-col">
      <h1 className="text-2xl mb-2 font-bold text-slate-900 tracking-tight">
        Quản Lý Mã Khuyến Mãi
      </h1>
      <p className="mt-2 uppercase text-[10px] tracking-widest text-slate-500">
        Thiết lập và theo dõi chiến dịch giảm giá
      </p>
    </div>
    <button
      onClick={onAdd}
      className="bg-[#506076] text-white px-4 py-2 rounded-[12px] text-xs uppercase tracking-wider hover:bg-[#535255] transition-all active:scale-[0.98] flex items-center gap-2"
    >
      <Plus size={16} />
      Thêm Mã Mới
    </button>
  </header>
);
export default VoucherHeader;
