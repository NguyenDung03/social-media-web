import React from "react";
import { motion } from "framer-motion";
import { FONTS, SPRING } from "./theme";

export const MetricFlatCard = ({
  title,
  value,
  change,
  trend,
  autoPulse,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  autoPulse: boolean;
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: SPRING },
      }}
      whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
      className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden h-full"
    >
      <div className="flex items-center justify-between mb-8 relative z-10">
        <span
          className="text-xl uppercase tracking-[0.05em] mt-5.5 text-[#787774]"
          style={{ fontFamily: FONTS.mono }}
        >
          {title}
        </span>
        {autoPulse && (
          <span className="flex size-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#346538] opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-[#346538]"></span>
          </span>
        )}
      </div>

      <div className="flex mb-5.5 items-end justify-between relative z-10 mt-auto">
        <h3
          className="text-4xl text-[#111111] font-medium tracking-tight"
          style={{ fontFamily: FONTS.mono }}
        >
          {value}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider ${
            trend === "up"
              ? "bg-[#EDF3EC] text-[#346538]"
              : "bg-[#FDEBEC] text-[#9F2F2D]"
          }`}
          style={{ fontFamily: FONTS.mono }}
        >
          {change}
        </span>
      </div>

      {/* Subtle hover gradient entering from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.02)] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
    </motion.div>
  );
};
