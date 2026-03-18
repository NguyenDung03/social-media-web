import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Tag, Loader2 } from "lucide-react";
import type { TCategory, TFormCategory } from "../../../../types/category.type";

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: TCategory | null;
  formData: TFormCategory;
  setFormData: (data: TFormCategory) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  isOpen,
  onClose,
  editingCategory,
  formData,
  setFormData,
  onSubmit,
  isPending,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[50]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-[450px] bg-white shadow-2xl z-[60] flex flex-col p-8 gap-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {editingCategory ? "Cập nhật Danh mục" : "Thêm Danh mục mới"}
                </h2>
                <p className=" text-[15px] mt-3 text-slate-500 tracking-widest">
                  Nhập thông tin chi tiết bên dưới
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-8">
              <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-3">
                  <label className="font-mono text-[10px] uppercase text-slate-500 tracking-widest block">
                    URL Hình ảnh
                  </label>
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          className="w-full h-full object-contain"
                          alt="Preview"
                        />
                      ) : (
                        <Camera size={20} className="text-slate-300" />
                      )}
                    </div>
                    <input
                      className="flex-1 bg-slate-50 border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-slate-200 text-sm"
                      placeholder="URL hình ảnh..."
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-slate-500 tracking-widest flex items-center gap-1">
                      <Tag size={10} /> Tên danh mục
                    </label>
                    <input
                      className="w-full bg-slate-50 border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-slate-200 text-sm font-medium"
                      placeholder="VD: Chăm sóc da"
                      value={formData.nameCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nameCategory: e.target.value,
                        })
                      }
                      required
                      type="text"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-slate-500 tracking-widest block">
                      Mô tả ngắn
                    </label>
                    <textarea
                      className="w-full bg-slate-50 border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-slate-200 text-sm resize-none h-32"
                      placeholder="Nhập tóm tắt về danh mục..."
                      value={formData.desc}
                      onChange={(e) =>
                        setFormData({ ...formData, desc: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className=" text-[13px] text-slate-500  block">
                      Trạng thái
                    </label>
                    <div className="flex gap-4">
                      {["active", "inactive"].map((s) => (
                        <label
                          key={s}
                          className={`flex-1 flex items-center justify-center py-2.5 rounded-lg border text-xs uppercase tracking-wider cursor-pointer transition-all ${
                            formData.status === s
                              ? "bg-green-400 text-white font-bold border-green-400"
                              : "bg-slate-50 text-slate-400 border-transparent hover:border-slate-200"
                          }`}
                        >
                          <input
                            type="radio"
                            className="hidden"
                            name="status"
                            value={s}
                            checked={formData.status === s}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                status: s as "active" | "inactive",
                              })
                            }
                          />
                          {s === "active" ? "Hoạt động" : "Tạm ngưng"}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-slate-900 text-white  text-xs uppercase py-4 rounded-[15px] hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPending && <Loader2 size={16} className="animate-spin" />}
                  {editingCategory ? "Lưu Thay Đổi" : "Tạo Mới"}
                </button>
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
