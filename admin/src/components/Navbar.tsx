import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Crosshair, MagnifyingGlass } from "@phosphor-icons/react";
import { FONTS } from "../pages/home/dashboard/components/theme";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const { scrollY } = useScroll();

  // On dashboard, it's always visible. On other pages, it fades out on scroll.
  const opacity = useTransform(scrollY, [0, 150], [1, isDashboard ? 1 : 0]);

  const user = React.useMemo(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const displayName = user?.fullName || "Admin";

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl pointer-events-none">
      <motion.div
        style={{ opacity }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[rgba(255,255,255,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.4)] shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-6 py-4 flex items-center justify-between pointer-events-auto"
      >
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-[#111111] text-[#FFFFFF] p-1.5 rounded-full flex items-center justify-center">
            <Crosshair size={16} weight="bold" />
          </span>
          <span
            className="text-sm font-semibold tracking-tight text-[#111111]"
            style={{ fontFamily: FONTS.sans }}
          >
            Vibe Flow
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[#111111] text-[13px] font-medium">
            Dashboard
          </Link>
          <Link
            to="/product"
            className="text-[#787774] text-[13px] hover:text-[#111111] transition-colors"
          >
            Sản phẩm
          </Link>
          <Link
            to="/order"
            className="text-[#787774] text-[13px] hover:text-[#111111] transition-colors"
          >
            Đơn hàng
          </Link>
          <Link
            to="/brand"
            className="text-[#787774] text-[13px] hover:text-[#111111] transition-colors"
          >
            Thương hiệu
          </Link>
          <Link
            to="/category"
            className="text-[#787774] text-[13px] hover:text-[#111111] transition-colors"
          >
            Danh mục
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <MagnifyingGlass
            size={18}
            className="text-[#787774] hover:text-[#111111] cursor-pointer transition-colors"
          />
          <div className="w-[1px] h-4 bg-[#EAEAEA]" />
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-medium text-[#111111]">
                {displayName || "Nguyễn Dũng"}
              </span>
              <span className="mt-1 text-[10px] text-[#787774] ">
                Quản trị viên
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-[#EAEAEA] bg-[#F7F6F3] overflow-hidden  group-hover:grayscale-0 transition-all">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};
