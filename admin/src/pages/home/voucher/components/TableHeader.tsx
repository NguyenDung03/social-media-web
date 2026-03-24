import React from "react";

export const TableHeader: React.FC = () => (
  <div className="grid grid-cols-12 px-8 py-2 mb-2">
    <div className="col-span-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
      Mã voucher
    </div>
    <div className="col-span-3 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
      Chi tiết ưu đãi
    </div>
    <div className="col-span-3 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
      Thời gian áp dụng
    </div>
    <div className="col-span-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
      Trạng thái
    </div>
    <div className="col-span-2 text-right text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
      Thao tác
    </div>
  </div>
);

export default TableHeader;
