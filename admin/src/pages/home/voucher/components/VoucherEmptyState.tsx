import React from "react";
import { Calendar, Plus } from "lucide-react";
interface VoucherEmptyStateProps {
  onAdd: () => void;
}
export const VoucherEmptyState: React.FC<VoucherEmptyStateProps> = ({
  onAdd,
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
      <Calendar size={32} className="text-slate-300" />
    </div>
    <h3 className="text-lg font-semibold text-slate-700 mb-2">
      Chưa có mã khuyến mãi nào
    </h3>
    <p className="text-slate-500 text-sm mb-6 max-w-sm">
      Tạo mã khuyến mãi đầu tiên để bắt đầu chiến dịch giảm giá cho khách hàng
      của bạn.
    </p>
    <button
      onClick={onAdd}
      className="bg-[#5f5e61] text-white px-5 py-2 rounded-sm font-medium text-xs uppercase tracking-widest hover:bg-[#535255] transition-all active:scale-[0.98] flex items-center gap-2"
    >
      <Plus size={16} />
      Tạo mã khuyến mãi
    </button>
  </div>
);
export default VoucherEmptyState;
