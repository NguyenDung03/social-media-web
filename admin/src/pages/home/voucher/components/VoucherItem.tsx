import React from "react";
import { motion } from "framer-motion";
import { Calendar, Edit } from "lucide-react";
import type { TVoucher } from "../../../../types/voucher.type";
interface VoucherItemProps {
  voucher: TVoucher;
  index: number;
  onEdit: (voucher: TVoucher) => void;
}
export const VoucherItem: React.FC<VoucherItemProps> = ({
  voucher,
  index,
  onEdit,
}) => {
  const isActive = voucher.status === "active";
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const formatDiscount = () => {
    if (voucher.voucherPrice > 0) {
      return `${voucher.voucherPrice.toLocaleString("vi-VN")} VNĐ`;
    }
    return `${voucher.discount}% OFF`;
  };
  const formatMinOrder = () => {
    if (voucher.applicablePrice > 0) {
      return `Tối thiểu: ${voucher.applicablePrice.toLocaleString("vi-VN")} VNĐ`;
    }
    return "Không giới hạn";
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white border border-slate-200/60 rounded-xl overflow-hidden transition-all hover:border-slate-300/50 group"
    >
      <div className="bg-slate-50/50 grid grid-cols-12 items-center px-6 py-4">
        {}
        <div className="col-span-2">
          <span className="inline-block px-3 py-1 border border-dashed border-slate-300 rounded-md font-mono text-sm font-bold text-slate-700 bg-white/50">
            {voucher.code}
          </span>
        </div>
        {}
        <div className="col-span-3">
          <div className="flex flex-col">
            <span className="text-slate-900 font-bold text-lg font-mono">
              {formatDiscount()}
            </span>
            <span className="text-slate-500 text-xs font-mono">
              {formatMinOrder()}
            </span>
          </div>
        </div>
        {}
        <div className="col-span-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={14} />
            <span className="font-mono text-sm">
              {formatDate(voucher.startDate)} — {formatDate(voucher.endDate)}
            </span>
          </div>
        </div>
        {}
        <div className="col-span-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-red-50 text-red-700 border-red-100"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-500"}`}
            />
            {isActive ? "Hoạt động" : "Tạm dừng"}
          </span>
        </div>
        {}
        <div className="col-span-2 flex justify-end">
          <button
            onClick={() => onEdit(voucher)}
            className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-[#5f5e61]"
          >
            <Edit size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default VoucherItem;
