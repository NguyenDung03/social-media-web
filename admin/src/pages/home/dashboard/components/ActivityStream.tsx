import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  XCircle,
  Truck,
  Receipt,
  ShoppingBagOpenIcon,
} from "@phosphor-icons/react";
import { FONTS, SPRING } from "./theme";
import { useGetAllOrders } from "../../../../hooks/useOrder";
import type { TOrder } from "../../../../types/order.type";
type TActivityItem = {
  id: string;
  user: string;
  action: string;
  time: string;
  type: string;
  icon: React.ReactNode;
};
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <Package color="green" weight="fill" className="text-[#346538]" />;
    case "cancelled":
      return <XCircle color="red" weight="fill" className="text-[#9F2F2D]" />;
    case "delivery":
      return <Truck color="blue" weight="fill" className="text-[#1F6C9F]" />;
    case "confirmed":
      return (
        <Receipt color="orange" weight="fill" className="text-[#956400]" />
      );
    case "pending":
    default:
      return (
        <ShoppingBagOpenIcon
          color="green"
          weight="fill"
          className="text-[#787774]"
        />
      );
  }
};
const mapOrderToActivity = (
  order: TOrder,
  indexOffset: number = 0,
): TActivityItem => {
  const userName = order.infoOrderShipping?.name || "Khách hàng ẩn danh";
  const firstProduct =
    order.products?.[0]?.productId?.nameProduct || "sản phẩm";
  const date = new Date(order.createdAt);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  let action = "vừa tạo đơn hàng";
  if (order.status === "completed") action = `vừa nhận ${firstProduct}`;
  else if (order.status === "cancelled") action = `vừa huỷ đơn ${firstProduct}`;
  else if (order.status === "delivery") action = `đang giao ${firstProduct}`;
  else action = `vừa đặt mua ${firstProduct}`;
  return {
    id: `${order._id}-${Date.now()}-${indexOffset}`,
    user: `Khách hàng ${userName}`,
    action: action,
    time: `${hours}:${minutes}`,
    type: order.status.toUpperCase(),
    icon: getStatusIcon(order.status),
  };
};
export const IntelligentActivityStream = () => {
  const { data: orderResponse } = useGetAllOrders();
  const [items, setItems] = useState<TActivityItem[]>([]);
  useEffect(() => {
    const orders = (orderResponse as any)?.docs as TOrder[] | undefined;
    if (!orders || orders.length === 0) return;
    const getRandomOrder = () =>
      orders[Math.floor(Math.random() * orders.length)];
    setItems([
      mapOrderToActivity(getRandomOrder(), 1),
      mapOrderToActivity(getRandomOrder(), 2),
      mapOrderToActivity(getRandomOrder(), 3),
    ]);
    const timer = setInterval(() => {
      setItems((prev) => {
        const newItems = [...prev];
        newItems.pop();
        newItems.unshift(mapOrderToActivity(getRandomOrder(), Date.now()));
        return newItems;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [orderResponse]);
  return (
    <div className="flex-1 min-h-0 relative mt-4">
      {}
      <div className="absolute left-[7px] top-2 bottom-0 w-[1px] bg-gradient-to-b from-[#EAEAEA] to-transparent z-0" />
      {items.length === 0 && (
        <div className="text-[#787774] text-xs font-mono ml-8 mt-2 opacity-50 relative z-10">
          Fetching feed...
        </div>
      )}
      <div className="relative h-[320px] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((activity, index) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: index === 0 ? 1 : 0.4,
                y: 0,
                scale: 1,
                transition: SPRING,
              }}
              exit={{
                opacity: 0,
                x: 20,
                transition: { duration: 0.4 },
              }}
              className="flex items-start gap-6 relative z-10 mb-6 h-[72px]"
            >
              <div className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#EAEAEA] flex items-center justify-center mt-1 shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm text-[#111111] leading-snug line-clamp-2"
                  style={{ fontFamily: FONTS.sans }}
                >
                  <span className="font-semibold text-[#111111]">
                    {activity.user}
                  </span>{" "}
                  {activity.action}
                </p>
                <div className="flex items-center gap-3 mt-1.5 ">
                  <span
                    className="text-[10px] text-[#787774] opacity-80"
                    style={{ fontFamily: FONTS.mono }}
                  >
                    {activity.time}
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      activity.type === "COMPLETED"
                        ? "bg-[#EDF3EC] text-[#346538]"
                        : activity.type === "CANCELLED"
                          ? "bg-[#FDEBEC] text-[#9F2F2D]"
                          : "bg-[#F7F6F3] text-[#787774]"
                    }`}
                    style={{ fontFamily: FONTS.mono }}
                  >
                    {activity.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
