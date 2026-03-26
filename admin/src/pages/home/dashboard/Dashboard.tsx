
import React from "react";
import { motion } from "framer-motion";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { FONTS, STAGGER_TRANSITION } from "./components/theme";
import { EditorialLine, DoubleBezelShell } from "./components/Structural";
import { MetricFlatCard } from "./components/MetricCard";
import { IntelligentActivityStream } from "./components/ActivityStream";
import { Navbar } from "../../../components/Navbar";
import { Hero } from "./components/Hero";
import { Inventory } from "./components/Inventory";
import { useGetAllOrders } from "../../../hooks/useOrder";
import { Outlet, useLocation } from "react-router-dom";
export default function DashboardPage() {
  const location = useLocation();
  const isRoot = location.pathname === "/";
  const { data: completedOrdersResponse } = useGetAllOrders({
    status: "completed",
    _limit: 1000,
  });
  const { data: pendingOrdersResponse } = useGetAllOrders({
    status: "pending",
    _limit: 1000,
  });
  const totalRevenue = React.useMemo(() => {
    const orders = (completedOrdersResponse as any)?.docs || [];
    return orders.reduce(
      (acc: number, order: any) => acc + (order.total || 0),
      0,
    );
  }, [completedOrdersResponse]);
  const pendingCount = React.useMemo(() => {
    return (pendingOrdersResponse as any)?.totalDocs || 0;
  }, [pendingOrdersResponse]);
  return (
    <div
      className="min-h-[100dvh] bg-[#FBFBFA] selection:bg-[#EAEAEA] selection:text-[#111111]"
      style={{ fontFamily: FONTS.sans }}
    >
      <Navbar />
      {}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: STAGGER_TRANSITION },
        }}
        className="max-w-7xl mx-auto px-6 py-32 md:py-40"
      >
        {isRoot ? (
          <>
            <Hero />
            <EditorialLine />
            {}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {}
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricFlatCard
                  title="Chỉ số tương tác"
                  value="84.2K"
                  change="+12.5%"
                  trend="up"
                  autoPulse={true}
                />
                <MetricFlatCard
                  title="Doanh thu thực tế"
                  value={`${totalRevenue.toLocaleString()} VNĐ`}
                  change="+15%"
                  trend="up"
                  autoPulse={false}
                />
                <MetricFlatCard
                  title="Đơn hàng chờ duyệt"
                  value={pendingCount.toString()}
                  change="-5%"
                  trend="down"
                  autoPulse={true}
                />
                <MetricFlatCard
                  title="Tỷ lệ lấp đầy"
                  value="3.8 %"
                  change="+0.4%"
                  trend="up"
                  autoPulse={false}
                />
              </div>
              {}
              <div className="md:col-span-4 max-h-[460px]">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
                    visible: {
                      opacity: 1,
                      clipPath: "inset(0 0 0 0)",
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="h-full"
                >
                  <DoubleBezelShell className="h-full">
                    <div className="p-8 h-full flex flex-col overflow-hidden">
                      <div className="flex justify-between items-center mb-6 shrink-0">
                        <h2
                          className="text-2xl text-[#111111]"
                          style={{ fontFamily: FONTS.display }}
                        >
                          Các hoạt động gần đây
                        </h2>
                        <button className="text-[#787774] hover:text-[#111111] transition-colors p-1">
                          <DotsThreeVertical size={20} />
                        </button>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <IntelligentActivityStream />
                      </div>
                    </div>
                  </DoubleBezelShell>
                </motion.div>
              </div>
            </div>
            <Inventory />
          </>
        ) : (
          <Outlet />
        )}
      </motion.main>
    </div>
  );
}
