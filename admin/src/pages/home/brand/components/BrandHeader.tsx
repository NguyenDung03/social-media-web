import React from "react";
import { Plus } from "lucide-react";

interface BrandHeaderProps {
  onAdd: () => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ onAdd }) => {
  return (
    <header className="bg-white border-b rounded-[10px] border-slate-200/60 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl mb-2 font-bold text-slate-900 tracking-tight">
          Quản Lý Thương Hiệu
        </h1>
        <p className="mt-2 uppercase text-[10px] tracking-widest text-slate-500">
          Danh sách các nhãn hàng và đối tác phân phối trên hệ thống.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="bg-[#506076] text-white px-4 py-2 rounded-[12px] text-xs uppercase tracking-wider hover:bg-[#535255] transition-all active:scale-[0.98] flex items-center gap-2"
      >
        <Plus size={16} />
        Thêm Thương hiệu
      </button>
    </header>
  );
};
