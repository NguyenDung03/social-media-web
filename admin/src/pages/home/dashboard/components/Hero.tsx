import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "@phosphor-icons/react";
import { FONTS, SPRING } from "./theme";

export const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: SPRING },
        }}
        className="w-full md:w-1/2 space-y-6"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#111111] opacity-40"></span>
            <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.2em] text-[#787774] font-medium"
            style={{ fontFamily: FONTS.mono }}
          >
            System Active
          </span>
        </div>
        <h1
          className="text-6xl md:text-8xl text-[#111111] leading-[1.05] tracking-tight"
          style={{ fontFamily: FONTS.display }}
        >
          Good morning, <br />
          <span className="italic text-[#787774]">Administrator.</span>
        </h1>
      </motion.div>

      {/* Right Pillar Data Point */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0, transition: SPRING },
        }}
        className="w-full md:w-auto flex flex-col items-start md:items-end justify-end"
      >
        <p className="text-lg text-[#787774] max-w-[30ch] md:text-right leading-relaxed mb-6">
          Tổng quan hoạt động nền tảng theo dõi hiệu suất kinh doanh và tương
          tác người dùng theo thời gian thực
        </p>
        <div className="flex items-center gap-3 bg-[#FFFFFF] border border-[#EAEAEA] px-5 py-2.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <ShieldCheck size={16} className="text-[#111111]" />
          <span
            className="text-[11px] uppercase tracking-widest text-[#111111]"
            style={{ fontFamily: FONTS.mono }}
          >
            An toàn bảo mật
          </span>
        </div>
      </motion.div>
    </div>
  );
};
