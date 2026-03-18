import React from "react";
import { motion } from "framer-motion";
import { Edit3, MoreVertical, Tag, Clock } from "lucide-react";
import type { TBrand } from "../../../../types/brand.type";

interface BrandItemProps {
  brand: TBrand;
  index: number;
  onEdit: (brand: TBrand) => void;
}

export const BrandItem: React.FC<BrandItemProps> = ({
  brand,
  index,
  onEdit,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="w-full rounded-2xl border border-slate-200/40 bg-white p-1.5 group hover:border-slate-300 transition-all"
    >
      <div
        className="rounded-xl bg-slate-50/80 px-6 py-4 flex items-center gap-6 group-hover:bg-[#dde4e3]/30 transition-colors cursor-pointer"
        onClick={() => onEdit(brand)}
      >
        <div className="w-20 h-25 rounded-[20px] bg-white flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200/50 shadow-sm">
          {brand.image ? (
            <img
              src={brand.image}
              alt={brand.nameBrand}
              className="w-full h-full object-cover"
            />
          ) : (
            <Tag size={20} className="text-slate-200" />
          )}
        </div>

        <div className="flex-1 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-12 lg:col-span-3">
            <h3 className="font-semibold text-slate-900 text-lg">
              {brand.nameBrand}
            </h3>
            <p className="font-mono text-[10px] text-slate-500 mt-0.5">
              {brand._id.slice(-8).toUpperCase()}
            </p>
          </div>

          <div className="hidden lg:block col-span-4">
            <p className="text-lg text-slate-500 truncate max-w-sm">
              {brand.desc}
            </p>
          </div>

          <div className="hidden lg:block col-span-1 text-center">
            <span
              className={`text-[8px] uppercase px-2 py-1 rounded-full font-bold tracking-wider inline-block whitespace-nowrap ${
                brand.status === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {brand.status === "active" ? "Hoạt động" : "Tạm ngưng"}
            </span>
          </div>

          <div className="hidden lg:block col-span-2 text-right">
            <span className="font-mono text-[15px] text-slate-400 uppercase tracking-tighter flex items-center justify-end gap-1">
              <Clock size={15} />{" "}
              {new Date(brand.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="col-span-12 lg:col-span-2 flex justify-end gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(brand);
              }}
              className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-[#5f5e61]"
            >
              <Edit3 size={18} />
            </button>
            <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-red-500 font-bold">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
