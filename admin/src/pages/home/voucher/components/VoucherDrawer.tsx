import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, Edit, Settings } from "lucide-react";
import type { TVoucher } from "../../../types/voucher.type";

interface VoucherFormData {
  code: string;
  discount: number;
  desc: string;
  startDate: string;
  endDate: string;
  voucherPrice: number;
  applicablePrice: number;
  status: "active" | "inactive";
}

interface VoucherDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editingVoucher: TVoucher | null;
  formData: VoucherFormData;
  setFormData: React.Dispatch<React.SetStateAction<VoucherFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export const VoucherDrawer: React.FC<VoucherDrawerProps> = ({
  isOpen,
  onClose,
  editingVoucher,
  formData,
  setFormData,
  onSubmit,
  isPending,
}) => {
  const [activeTab, setActiveTab] = useState<"general" | "logic" | "limits">(
    "general",
  );

  const isEdit = !!editingVoucher;
  const isValid = formData.code && formData.startDate && formData.endDate;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-96 bg-white border-l border-slate-200 flex flex-col shadow-2xl z-50"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-lg font-bold text-slate-900">
                  {isEdit ? "Chỉnh sửa voucher" : "Tạo mã mới"}
                </span>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-slate-100 rounded"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              <span className="font-mono text-[11px] uppercase text-slate-400 tracking-wider">
                {isEdit ? `ID: ${editingVoucher._id.slice(-6)}` : "TẠO_MỚI"}
              </span>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200/10">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex-1 py-3 text-xs font-mono uppercase flex flex-col items-center gap-1 transition-colors ${
                  activeTab === "general"
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <Edit size={16} />
                Chung
              </button>
              <button
                onClick={() => setActiveTab("logic")}
                className={`flex-1 py-3 text-xs font-mono uppercase flex flex-col items-center gap-1 transition-colors ${
                  activeTab === "logic"
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <Settings size={16} />
                Logic
              </button>
              <button
                onClick={() => setActiveTab("limits")}
                className={`flex-1 py-3 text-xs font-mono uppercase flex flex-col items-center gap-1 transition-colors ${
                  activeTab === "limits"
                    ? "bg-slate-100 text-slate-900 font-bold"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                <Settings size={16} />
                Giới hạn
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* General Tab */}
              {activeTab === "general" && (
                <>
                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase text-slate-500 block">
                      Mã voucher <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          code: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-sm font-mono text-sm focus:ring-1 focus:ring-[#5f5e61] px-3 py-2"
                      placeholder="VD: SUMMER2024"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase text-slate-500 block">
                      Giá trị giảm <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discount: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-sm font-mono text-sm focus:ring-1 focus:ring-[#5f5e61] px-3 py-2"
                      placeholder="20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase text-slate-500 block">
                      Giá trị giảm cố định (VNĐ)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.voucherPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          voucherPrice: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-sm font-mono text-sm focus:ring-1 focus:ring-[#5f5e61] px-3 py-2"
                      placeholder="0"
                    />
                    <p className="text-xs text-slate-400">
                      Để trống nếu dùng %
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase text-slate-500 block">
                      Trạng thái
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "active" | "inactive",
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-sm font-bold text-sm focus:ring-1 focus:ring-[#5f5e61] px-3 py-2"
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Tạm dừng</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase text-slate-500 block">
                      Mô tả
                    </label>
                    <textarea
                      value={formData.desc}
                      onChange={(e) =>
                        setFormData({ ...formData, desc: e.target.value })
                      }
                      className="w-full bg-slate-50 border-none rounded-sm font-sans text-sm h-32 focus:ring-1 focus:ring-[#5f5e61] px-3 py-2 resize-none"
                      placeholder="Mô tả chiến dịch..."
                    />
                  </div>
                </>
              )}

              {/* Logic Tab */}
              {activeTab === "logic" && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[11px] uppercase text-slate-500 block">
                      Giá áp dụng tối thiểu (VNĐ)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.applicablePrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          applicablePrice: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-sm font-mono text-sm focus:ring-1 focus:ring-[#5f5e61] px-3 py-2"
                      placeholder="0"
                    />
                    <p className="text-xs text-slate-400">
                      Đơn hàng tối thiểu để áp dụng mã giảm giá
                    </p>
                  </div>
                </div>
              )}

              {/* Limits Tab */}
              {activeTab === "limits" && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">
                      Tính năng giới hạn số lượt sử dụng sẽ được cập nhật trong
                      phiên bản tới.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Dates - Always visible */}
            <div className="px-6 py-4 border-t border-slate-200/10 space-y-4">
              <div className="space-y-2">
                <label className="font-mono text-[11px] uppercase text-slate-500 block">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full bg-slate-50 border-none rounded-sm font-mono text-sm focus:ring-1 focus:ring-[#5f5e61] px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[11px] uppercase text-slate-500 block">
                  Ngày kết thúc <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full bg-slate-50 border-none rounded-sm font-mono text-sm focus:ring-1 focus:ring-[#5f5e61] px-3 py-2"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200/10 space-y-3">
              <button
                onClick={onSubmit}
                disabled={isPending || !isValid}
                className="w-full bg-[#5f5e61] text-white py-3 rounded-sm font-medium uppercase tracking-widest text-xs hover:bg-[#535255] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                {isEdit ? "Lưu thay đổi" : "Tạo mã voucher"}
              </button>
              <button
                onClick={onClose}
                className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-sm font-medium text-sm hover:bg-slate-50 transition-colors"
              >
                Hủy bỏ
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default VoucherDrawer;
