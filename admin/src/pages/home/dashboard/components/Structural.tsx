import React from "react";
export const EditorialLine = () => (
  <div className="w-full h-[2px] bg-[#EAEAEA] my-12" />
);
export const DoubleBezelShell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-[#FDFBF7] p-2 rounded-[2rem] border border-[rgba(0,0,0,0.06)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] ${className}`}
  >
    {}
    <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-[calc(2rem-0.5rem)] h-full overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,1)] relative">
      {children}
    </div>
  </div>
);
