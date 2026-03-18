import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Archive,
  Search,
  Filter,
  RotateCcw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Bell,
  X,
  Package,
  TrendingUp,
  Database,
  Calendar,
} from "lucide-react";

// --- Types ---
interface ArchivedItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  deletedDate: string;
  value: string;
  image: string;
}

// --- Mock Data ---
const ARCHIVE_DATA: ArchivedItem[] = [
  {
    id: "1",
    name: "Đồng hồ Chrono X1",
    category: "Phụ kiện thời trang",
    sku: "ARV-9921-X1",
    deletedDate: "24/05/2024",
    value: "4.500.000",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=watch1",
  },
  {
    id: "2",
    name: "Tai nghe Studio Pro",
    category: "Âm thanh cao cấp",
    sku: "ARV-4420-HP",
    deletedDate: "22/05/2024",
    value: "8.200.000",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=audio2",
  },
  {
    id: "3",
    name: "Giày Nike Air Max Red",
    category: "Giày thể thao",
    sku: "ARV-1102-SN",
    deletedDate: "19/05/2024",
    value: "3.950.000",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=shoes3",
  },
  {
    id: "4",
    name: "Máy ảnh Polaroid Gen 2",
    category: "Nhiếp ảnh",
    sku: "ARV-3305-PC",
    deletedDate: "15/05/2024",
    value: "2.100.000",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=camera4",
  },
];

const ArchiveOS: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    ARCHIVE_DATA.slice(0, 3).map((i) => i.id),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === ARCHIVE_DATA.length) setSelectedIds([]);
    else setSelectedIds(ARCHIVE_DATA.map((i) => i.id));
  };

  return (
    <div className="min-h-screen bg-[#f8f6f6] text-slate-900 font-sans selection:bg-black/10 relative overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <header className="border-b border-black/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <Archive size={16} className="text-white" />
              </div>
              <span className="font-bold tracking-tight text-xl uppercase font-mono">
                Archive OS
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-[0.15em]">
              <a
                href="#"
                className="text-slate-400 hover:text-black transition-colors"
              >
                Tổng quan
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-black transition-colors"
              >
                Sản phẩm
              </a>
              <a href="#" className="text-black border-b-2 border-black py-5">
                Kho lưu trữ
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block font-mono text-[10px] text-slate-500 border border-black/10 px-3 py-1 rounded">
              SYS_STATUS: <span className="text-emerald-500">ACTIVE</span>
            </div>
            <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors">
              <Bell size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Tổng mục lưu trữ",
              value: "482",
              change: "+12",
              icon: <Package size={14} />,
            },
            {
              label: "Giá trị tồn kho lưu",
              value: "1.2B",
              sub: "VND",
              icon: <TrendingUp size={14} />,
            },
            {
              label: "Dung lượng chiếm dụng",
              value: "14.2",
              sub: "GB",
              icon: <Database size={14} />,
            },
            {
              label: "Tự động xóa sau",
              value: "30",
              sub: "NGÀY",
              icon: <Calendar size={14} />,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border border-black/5 bg-white rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-slate-400">{stat.icon}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  {stat.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light font-mono tracking-tighter">
                  {stat.value}
                </span>
                {stat.change ? (
                  <span className="text-black text-xs font-mono font-bold">
                    {stat.change}
                  </span>
                ) : (
                  <span className="text-slate-400 text-[10px] font-bold uppercase">
                    {stat.sub}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border border-black/10 p-2 bg-white rounded-xl gap-4">
          <div className="flex items-center gap-3 flex-1 px-2 w-full">
            <Search size={18} className="text-slate-400" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full font-medium placeholder:text-slate-300"
              placeholder="Tìm kiếm trong kho lưu trữ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 hover:bg-black/5 transition-colors flex items-center justify-center gap-2 rounded-lg">
              <Filter size={14} /> Bộ lọc
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-black text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 rounded-lg shadow-lg shadow-black/10">
              Xóa tất cả
            </button>
          </div>
        </div>

        {/* Archive Table with Double Bezel */}
        <div className="p-1 bg-black/5 rounded-[1.5rem] border border-black/10 shadow-sm">
          <div className="bg-white border border-black/10 rounded-[1.25rem] overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/5 bg-slate-50/50">
                  <th className="p-4 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === ARCHIVE_DATA.length}
                      onChange={toggleSelectAll}
                      className="rounded border-black/20 text-black focus:ring-black/20"
                    />
                  </th>
                  <th className="p-4 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Hình ảnh
                  </th>
                  <th className="p-4 text-left text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Sản phẩm
                  </th>
                  <th className="p-4 text-left text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Mã SKU
                  </th>
                  <th className="p-4 text-left text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Ngày xóa
                  </th>
                  <th className="p-4 text-right text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Giá trị
                  </th>
                  <th className="p-4 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {ARCHIVE_DATA.map((item) => (
                  <motion.tr
                    key={item.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-black/20 text-black focus:ring-black/20"
                      />
                    </td>
                    <td className="p-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg border border-black/5 overflow-hidden mx-auto">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                          alt="product"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {item.category}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs text-black/60">
                      {item.sku}
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-500">
                      {item.deletedDate}
                    </td>
                    <td className="p-4 text-right font-mono font-bold">
                      {item.value}{" "}
                      <span className="text-[9px] text-slate-400 ml-1">
                        VND
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-2 text-slate-400 hover:text-black hover:bg-black/5 rounded-lg transition-all"
                          title="Khôi phục"
                        >
                          <RotateCcw size={16} />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Xóa vĩnh viễn"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Trang 1 / 12
          </span>
          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-lg hover:bg-white transition-all disabled:opacity-20"
              disabled
            >
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 flex items-center justify-center border text-xs font-mono font-bold rounded-lg transition-all ${p === 1 ? "bg-black text-white border-black shadow-lg shadow-black/20" : "border-black/10 hover:bg-white"}`}
              >
                {p}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center border border-black/10 rounded-lg hover:bg-white transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-[100] w-[calc(100%-3rem)] max-w-[550px]"
          >
            <div className="bg-black text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 border-r border-white/20 pr-6">
                <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-bold font-mono">
                  {selectedIds.length.toString().padStart(2, "0")}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Đã chọn
                </span>
              </div>

              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-slate-300 transition-colors">
                  <RotateCcw size={14} /> Khôi phục
                </button>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
                  <Trash2 size={14} /> Xóa
                </button>
              </div>

              <button
                onClick={() => setSelectedIds([])}
                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArchiveOS;
