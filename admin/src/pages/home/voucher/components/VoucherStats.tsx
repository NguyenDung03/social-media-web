import React from "react";
import { Layers, Activity, Search } from "lucide-react";

interface VoucherStatsProps {
  total: number;
  active: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const VoucherStats: React.FC<VoucherStatsProps> = ({
  total,
  active,
  searchValue,
  onSearchChange,
}) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div className="flex items-center gap-12 mx-2">
      <div className="flex flex-col">
        <span className="font-mono font-bold text-[15px] uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1 ">
          <Layers size={15} /> Tổng cộng
        </span>
        <span className="font-mono text-xl font-semibold">{total}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-mono font-bold text-[15px] uppercase tracking-widest text-green-400 mb-1 flex items-center gap-1">
          <Activity size={15} /> Hoạt động
        </span>
        <span className="font-mono text-xl font-semibold text-green-400">
          {active}
        </span>
      </div>
    </div>

    <div className="relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-[#5f5e61] transition-colors" />
      <input
        className="pl-10 pr-4 py-2 bg-slate-100/50 border-none rounded-lg text-sm focus:ring-1 focus:ring-slate-200 w-full md:w-80 font-medium transition-all"
        placeholder="Tìm kiếm mã khuyến mãi..."
        type="text"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  </div>
);

export default VoucherStats;
