import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  LineChart,
  ShoppingCart,
  Bell,
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Archive,
  Trash,
  X,
  Upload,
  MoreHorizontal,
} from "lucide-react";

// --- Types ---
interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: "active" | "out_of_stock" | "paused";
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    sku: "MW-2024-X1",
    name: "Đồng hồ Minimalist White",
    category: "Thời trang & Phụ kiện",
    price: "2.450.000₫",
    stock: 124,
    status: "active",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=watch",
  },
  {
    id: "2",
    sku: "SH-RUN-002",
    name: "Giày Chạy Bộ Performance",
    category: "Giày dép thể thao",
    price: "1.890.000₫",
    stock: 42,
    status: "active",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=shoes",
  },
  {
    id: "3",
    sku: "AU-PRO-Z1-B",
    name: "Tai nghe Studio Pro Z1",
    category: "Âm thanh cao cấp",
    price: "5.500.000₫",
    stock: 0,
    status: "out_of_stock",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=audio",
  },
];

const ProductPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"current" | "archive">("current");

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === PRODUCTS.length) setSelectedIds([]);
    else setSelectedIds(PRODUCTS.map((p) => p.id));
  };

  return (
    <div className="bg-[#f8f6f6] text-[#1A1A19] min-h-screen font-sans selection:bg-[#ec5b13]/20">
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        {/* Page Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#1A1A19] font-title">
              Danh mục sản phẩm
            </h1>
            <p className="text-slate-400 mt-2">
              Hệ điều hành kiểm kê cao cấp cho thương mại xã hội
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 size-5 transition-colors group-focus-within:text-[#ec5b13]" />
              <input
                className="pl-11 pr-4 py-3 bg-white border border-[#EAEAEA] rounded-xl text-sm w-72 outline-none focus:ring-2 focus:ring-[#ec5b13]/10 focus:border-[#ec5b13] transition-all shadow-sm"
                placeholder="Tìm kiếm SKU hoặc tên..."
              />
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 bg-[#1A1A19] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1A1A19]/90 transition-all active:scale-95 shadow-lg shadow-[#1A1A19]/10"
            >
              <Plus size={18} /> Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Table Container (Double Bezel) */}
        <div className="rounded-[2rem] border border-[#EAEAEA] bg-[#FBFBFA] p-3">
          <div className="rounded-[1.25rem] border border-[#EAEAEA] bg-white min-h-[500px] flex flex-col overflow-hidden">
            {/* Table Filter Header */}
            <div className="px-6 py-4 border-b border-[#EAEAEA] flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
              <div className="flex bg-[#f8f6f6] p-1 rounded-xl border border-[#EAEAEA]">
                <button
                  onClick={() => setActiveTab("current")}
                  className={`px-6 py-2 rounded-lg text-sm transition-all ${activeTab === "current" ? "bg-white shadow-sm border border-[#EAEAEA] font-bold" : "text-slate-400 font-medium"}`}
                >
                  Sản phẩm hiện hành
                </button>
                <button
                  onClick={() => setActiveTab("archive")}
                  className={`px-6 py-2 rounded-lg text-sm transition-all ${activeTab === "archive" ? "bg-white shadow-sm border border-[#EAEAEA] font-bold" : "text-slate-400 font-medium"}`}
                >
                  Kho lưu trữ
                </button>
              </div>
              <div className="flex items-center gap-3">
                <select className="bg-white border border-[#EAEAEA] rounded-xl text-sm px-4 py-2 outline-none focus:ring-1 focus:ring-[#ec5b13] appearance-none pr-10">
                  <option>Tất cả trạng thái</option>
                  <option>Đang hoạt động</option>
                  <option>Hết hàng</option>
                </select>
                <button className="p-2 border border-[#EAEAEA] rounded-xl hover:bg-[#f8f6f6] text-slate-500">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#EAEAEA] bg-[#f8f6f6]/30">
                    <th className="pl-6 py-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === PRODUCTS.length}
                        onChange={toggleSelectAll}
                        className="rounded border-[#EAEAEA] text-[#ec5b13] focus:ring-[#ec5b13]"
                      />
                    </th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Sản phẩm
                    </th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      SKU / ID
                    </th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Giá bán
                    </th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Tồn kho
                    </th>
                    <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Trạng thái
                    </th>
                    <th className="pr-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]/50">
                  {PRODUCTS.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-[#f8f6f6]/40 transition-colors group"
                    >
                      <td className="pl-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className="rounded border-[#EAEAEA] text-[#ec5b13] focus:ring-[#ec5b13]"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <div className="size-14 rounded-xl border border-[#EAEAEA] bg-[#f8f6f6] overflow-hidden shadow-sm">
                            <img
                              src={product.image}
                              className="w-full h-full object-cover"
                              alt={product.name}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono text-[11px] text-slate-500 bg-[#f8f6f6] px-2 py-1 rounded">
                          {product.sku}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-mono font-bold text-sm">
                          {product.price}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-sm ${product.stock === 0 ? "text-red-500 font-medium italic" : "text-slate-600"}`}
                        >
                          {product.stock === 0
                            ? "Hết hàng"
                            : `${product.stock} đơn vị`}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`size-1.5 rounded-full ${product.status === "active" ? "bg-[#10B981]" : "bg-slate-300"}`}
                          ></div>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-tighter ${product.status === "active" ? "text-[#10B981]" : "text-slate-400"}`}
                          >
                            {product.status === "active"
                              ? "Đang bán"
                              : "Tạm ngưng"}
                          </span>
                        </div>
                      </td>
                      <td className="pr-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="p-2 rounded-lg border border-[#EAEAEA] bg-white text-slate-600 hover:text-[#ec5b13] hover:border-[#ec5b13]/30 transition-all"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button className="p-2 rounded-lg border border-[#EAEAEA] bg-white text-slate-300 hover:text-red-500 hover:border-red-500/30 transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[#EAEAEA] flex items-center justify-between bg-slate-50/30">
              <p className="text-xs text-slate-400">
                Hiển thị{" "}
                <span className="font-bold text-[#1A1A19]">1 - 10</span> trong
                số <span className="font-bold text-[#1A1A19]">452</span> sản
                phẩm
              </p>
              <div className="flex items-center gap-1">
                <button className="size-9 flex items-center justify-center rounded-lg border border-[#EAEAEA] text-slate-300 hover:bg-[#f8f6f6]">
                  <ChevronLeft size={16} />
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg bg-[#1A1A19] text-white font-bold text-xs">
                  1
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-[#f8f6f6] text-xs">
                  2
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg border border-[#EAEAEA] text-slate-300 hover:bg-[#f8f6f6]">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ y: 100, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              exit={{ y: 100, x: "-50%", opacity: 0 }}
              className="fixed bottom-10 left-1/2 bg-[#1A1A19] text-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-8 z-50 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="size-6 rounded-full bg-[#ec5b13] flex items-center justify-center text-[10px] font-bold">
                  {selectedIds.length}
                </span>
                <span className="text-sm font-medium">Sản phẩm đã chọn</span>
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <div className="flex items-center gap-5">
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#ec5b13] transition-colors">
                  <Archive size={16} /> Lưu trữ
                </button>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-all">
                  <Trash size={16} /> Xóa
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold uppercase hover:bg-white/20 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Product Detail Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-[#1A1A19]/40 backdrop-blur-sm z-50 pointer-events-auto"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-[60] flex flex-col border-l border-[#EAEAEA]"
            >
              <div className="px-8 py-6 border-b border-[#EAEAEA] flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">
                  Chi tiết sản phẩm
                </h3>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-[#f8f6f6] rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Hình ảnh sản phẩm
                  </p>
                  <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-[#EAEAEA] bg-[#f8f6f6] flex flex-col items-center justify-center gap-4 hover:border-[#ec5b13]/50 hover:bg-[#ec5b13]/5 transition-all cursor-pointer group">
                    <div className="size-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="text-[#ec5b13]" size={20} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">Nhấn để tải lên</p>
                      <p className="text-xs text-slate-400 font-mono">
                        PNG, JPG (Tối đa 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Tên sản phẩm
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-[#EAEAEA] rounded-xl focus:ring-2 focus:ring-[#ec5b13]/10 focus:border-[#ec5b13] outline-none text-sm font-medium"
                      defaultValue="Đồng hồ Minimalist White"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Mã SKU
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-[#EAEAEA] rounded-xl font-mono text-sm bg-slate-50"
                      defaultValue="MW-2024-X1"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Giá bán (₫)
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-[#EAEAEA] rounded-xl font-mono text-sm text-[#ec5b13] font-bold"
                      defaultValue="2.450.000"
                    />
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 border-t border-[#EAEAEA] flex gap-4 bg-slate-50/50">
                <button className="flex-1 bg-[#1A1A19] text-white py-4 rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-slate-900/10">
                  Lưu thay đổi
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-8 py-4 border border-[#EAEAEA] bg-white rounded-xl font-bold hover:bg-white/80 transition-all"
                >
                  Hủy
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EAEAEA; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ProductPage;
