import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  User,
  Package,
  CreditCard,
  Settings,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { FONTS } from "../dashboard/components/theme";
import { useGetAllOrders, useUpdateOrder } from "../../../hooks/useOrder";
import type { TOrder, TOrderStatus } from "../../../types/order.type";

// Order status type for filter
type FilterStatus = "all" | TOrderStatus;

// Helper to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};

// Status badge component
const StatusBadge = ({ status }: { status: TOrderStatus }) => {
  const statusConfig: Record<TOrderStatus, { label: string; bg: string; text: string; border: string }> = {
    pending: {
      label: "Chờ xác nhận",
      bg: "#f4f3f3",
      text: "#5a5c5c",
      border: "#adb3b2",
    },
    confirmed: {
      label: "Đã xác nhận",
      bg: "#e4e1e6",
      text: "#525155",
      border: "#adb3b2",
    },
    delivery: {
      label: "Đang giao",
      bg: "#d3e4fe",
      text: "#435368",
      border: "#adb3b2",
    },
    completed: {
      label: "Hoàn thành",
      bg: "#d6d3d7",
      text: "#525155",
      border: "#adb3b2",
    },
    cancelled: {
      label: "Đã hủy",
      bg: "#fe8983",
      text: "#752121",
      border: "#adb3b2",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded border"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        borderColor: `${config.border}33`,
      }}
    >
      {config.label}
    </span>
  );
};

// Filter button component
const FilterButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
        active
          ? "bg-[#111111] text-white"
          : "bg-white border border-[#EAEAEA] text-[#787774] hover:text-[#111111] hover:border-[#111111]/20"
      }`}
      style={{ fontFamily: FONTS.sans }}
    >
      {label}
    </button>
  );
};

// Order row component
const OrderRow = ({
  order,
  onClick,
}: {
  order: TOrder;
  onClick: () => void;
}) => {
  // Get payment status text
  const getPaymentStatus = () => {
    if (order.paymentMethod === "vnpay") {
      return "VNPay • ĐÃ THANH TOÁN";
    }
    return `COD • ${order.status === "completed" ? "ĐÃ NHẬN" : "CHƯA THANH TOÁN"}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`p-1 rounded-xl bg-white border border-[#EAEAEA] hover:border-[#111111]/20 transition-all duration-300 cursor-pointer group ${
        order.status === "cancelled" ? "opacity-60" : ""
      }`}
    >
      <div
        className="bg-[#F7F6F3] rounded-lg p-4 flex flex-col md:flex-row items-center gap-6"
        style={{ fontFamily: FONTS.mono }}
      >
        {/* Order ID */}
        <div className="flex-shrink-0 w-full md:w-32">
          <p className="text-[10px] uppercase tracking-widest text-[#787774] mb-1">
            Mã đơn hàng
          </p>
          <p className="text-sm font-semibold text-[#111111]">
            #{order._id.slice(-6).toUpperCase()}
          </p>
        </div>

        {/* Customer */}
        <div className="flex-grow">
          <p className="text-[10px] uppercase tracking-widest text-[#787774] mb-1">
            Khách hàng
          </p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-[#111111]">
              {order.infoOrderShipping?.name || "Khách hàng"}
            </span>
            <span className="text-xs text-[#787774]">
              {order.infoOrderShipping?.phone || ""}
            </span>
          </div>
        </div>

        {/* Payment */}
        <div className="flex-shrink-0 w-full md:w-40">
          <p className="text-[10px] uppercase tracking-widest text-[#787774] mb-1">
            Thanh toán
          </p>
          <p className="text-sm font-bold text-[#111111]">
            {formatCurrency(order.total)}
          </p>
          <p className="text-[10px] text-[#787774]">{getPaymentStatus()}</p>
        </div>

        {/* Assigned */}
        <div className="flex-shrink-0 w-full md:w-40">
          <p className="text-[10px] uppercase tracking-widest text-[#787774] mb-1">
            Phân công
          </p>
          {order.assignee ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#EAEAEA] flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#111111]">
                  {(order.assignee.fullname || "")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-medium text-[#111111]">
                {order.assignee.fullname}
              </span>
            </div>
          ) : (
            <span className="text-xs font-medium text-[#787774] italic">
              Chưa phân công
            </span>
          )}
        </div>

        {/* Status */}
        <div className="flex-shrink-0 w-full md:w-32">
          <StatusBadge status={order.status} />
        </div>

        {/* Chevron */}
        <motion.div className="flex-shrink-0 text-[#787774] group-hover:translate-x-1 transition-transform">
          <ChevronRight size={20} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Detail drawer component
const DetailDrawer = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  getNextStatuses,
  getStatusLabel,
  actionLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  order: TOrder | null;
  onUpdateStatus: (orderId: string, status: TOrderStatus) => void;
  getNextStatuses: (currentStatus: TOrderStatus) => TOrderStatus[];
  getStatusLabel: (status: TOrderStatus) => string;
  actionLoading: string | null;
}) => {
  const menuItems = [
    { icon: User, label: "Chi tiết khách hàng", active: true },
    { icon: Package, label: "Danh mục sản phẩm", active: false },
    { icon: CreditCard, label: "Phân bổ chi phí", active: false },
    { icon: Settings, label: "Thao tác quản trị", active: false },
  ];

  if (!order) return null;

  const nextStatuses = getNextStatuses(order.status);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#111111]/30 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[60] flex flex-col border-l border-[#EAEAEA]"
          >
            <div className="px-8 py-6 border-b border-[#EAEAEA] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-light tracking-tight text-[#111111]">
                  Xử lý đơn hàng
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#787774] mt-1">
                  Mã đơn: #{order._id.slice(-6).toUpperCase()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#F7F6F3] rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {/* Order Status */}
              <div className="py-2">
                <StatusBadge status={order.status} />
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-4 rounded-lg transition-all cursor-pointer ${
                      item.active
                        ? "bg-white text-[#111111] border border-[#EAEAEA]"
                        : "text-[#787774] hover:bg-[#F7F6F3]"
                    }`}
                  >
                    <item.icon
                      size={20}
                      className={item.active ? "text-[#111111]" : ""}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-widest">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-[#F7F6F3] rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs text-[#787774]">Tổng tiền:</span>
                  <span className="text-sm font-bold text-[#111111]">
                    {formatCurrency(order.total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#787774]">Phương thức:</span>
                  <span className="text-sm text-[#111111]">
                    {order.paymentMethod === "vnpay" ? "VNPay" : "COD"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#787774]">Sản phẩm:</span>
                  <span className="text-sm text-[#111111]">
                    {order.products?.length || 0} sản phẩm
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Status Update Buttons */}
                {nextStatuses.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#787774]">
                      Cập nhật trạng thái
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {nextStatuses.map((status) => (
                        <motion.button
                          key={status}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={actionLoading === order._id}
                          onClick={() => onUpdateStatus(order._id, status)}
                          className="flex-1 py-3 px-4 rounded-lg font-medium text-sm bg-[#111111] text-white hover:bg-[#333333] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ fontFamily: FONTS.sans }}
                        >
                          {actionLoading === order._id ? (
                            <Loader2 size={16} className="animate-spin mx-auto" />
                          ) : status === "completed" ? (
                            <span className="flex items-center justify-center gap-1">
                              <CheckCircle size={14} /> {getStatusLabel(status)}
                            </span>
                          ) : (
                            getStatusLabel(status)
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cancel Reason (if cancelled) */}
                {order.status === "cancelled" && order.reasonCancel && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
                      Lý do hủy đơn
                    </p>
                    <p className="text-sm text-red-700">{order.reasonCancel}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

// Loading skeleton component
const OrderRowSkeleton = () => (
  <div className="p-1 rounded-xl bg-white border border-[#EAEAEA]">
    <div className="bg-[#F7F6F3] rounded-lg p-4 flex flex-col md:flex-row items-center gap-6 animate-pulse">
      <div className="flex-shrink-0 w-full md:w-32">
        <div className="h-3 w-20 bg-[#EAEAEA] rounded mb-1" />
        <div className="h-4 w-24 bg-[#EAEAEA] rounded" />
      </div>
      <div className="flex-grow">
        <div className="h-3 w-16 bg-[#EAEAEA] rounded mb-1" />
        <div className="h-4 w-32 bg-[#EAEAEA] rounded" />
      </div>
      <div className="flex-shrink-0 w-full md:w-40">
        <div className="h-3 w-20 bg-[#EAEAEA] rounded mb-1" />
        <div className="h-4 w-28 bg-[#EAEAEA] rounded" />
      </div>
      <div className="flex-shrink-0 w-full md:w-40">
        <div className="h-3 w-16 bg-[#EAEAEA] rounded mb-1" />
        <div className="h-4 w-24 bg-[#EAEAEA] rounded" />
      </div>
      <div className="flex-shrink-0 w-full md:w-32">
        <div className="h-6 w-20 bg-[#EAEAEA] rounded" />
      </div>
    </div>
  </div>
);

// Main Order component
export default function OrderPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const limit = 10;

  // Mutations
  const updateOrderMutation = useUpdateOrder();

  const filters: { label: string; value: FilterStatus }[] = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Đã xác nhận", value: "confirmed" },
    { label: "Đang giao", value: "delivery" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
  ];

  // Build query params
  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = {
      _page: page,
      _limit: limit,
    };

    if (activeFilter !== "all") {
      params.status = activeFilter;
    }

    if (searchQuery.trim()) {
      params.q = searchQuery.trim();
    }

    return params;
  }, [activeFilter, searchQuery, page]);

  // Fetch orders from API
  const { data, isLoading, error } = useGetAllOrders(queryParams);

  const orders = data?.docs || [];
  const totalDocs = data?.totalDocs || 0;
  const totalPages = data?.totalPages || 1;

  // Handle filter change
  const handleFilterChange = (filter: FilterStatus) => {
    setActiveFilter(filter);
    setPage(1); // Reset to first page when filter changes
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page when search changes
  };

  // Get selected order from list
  const selectedOrderData = selectedOrder
    ? orders.find((o) => o._id === selectedOrder._id) || null
    : null;

  // Handle update order status
  const handleUpdateStatus = async (orderId: string, status: TOrderStatus) => {
    setActionLoading(orderId);
    try {
      await updateOrderMutation.mutateAsync({ orderId, status });
      setSelectedOrder(null);
    } catch (error: unknown) {
      console.error("Failed to update order status:", error);
      // Extract error message from response
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message || "Có lỗi xảy ra";
      alert(message);
    } finally {
      setActionLoading(null);
    }
  };

  // Available status transitions based on current status
  const getNextStatuses = (currentStatus: TOrderStatus): TOrderStatus[] => {
    const transitions: Record<TOrderStatus, TOrderStatus[]> = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["delivery", "cancelled"],
      delivery: ["completed", "cancelled"],
      completed: [],
      cancelled: [],
    };
    return transitions[currentStatus] || [];
  };

  // Get status label
  const getStatusLabel = (status: TOrderStatus): string => {
    const labels: Record<TOrderStatus, string> = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      delivery: "Đang giao",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return labels[status];
  };

  return (
    <main className="pt-24 pb-12 px-6 max-w-screen-xl mx-auto">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <h1
          className="text-4xl font-light tracking-tight text-[#111111] mb-2"
          style={{ fontFamily: FONTS.sans }}
        >
          Trung tâm Xử lý Đơn hàng
        </h1>
        <p className="text-[#787774]" style={{ fontFamily: FONTS.sans }}>
          Theo dõi và điều phối vận chuyển hệ thống thời gian thực.
        </p>
      </motion.header>

      {/* Functional Controls & Filters */}
      <section className="mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4"
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <FilterButton
                key={filter.value}
                label={filter.label}
                active={activeFilter === filter.value}
                onClick={() => handleFilterChange(filter.value)}
              />
            ))}
          </div>

          {/* Search Input */}
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#787774]"
            />
            <input
              className="pl-10 pr-4 py-2 bg-white border border-[#EAEAEA] rounded-lg text-sm w-full md:w-64 focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 outline-none transition-all text-[#111111] placeholder:text-[#ABABAB]"
              placeholder="Tìm mã đơn, khách hàng..."
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ fontFamily: FONTS.sans }}
            />
          </div>
        </motion.div>
      </section>

      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">
            Lỗi khi tải đơn hàng: {error.message}
          </p>
        </div>
      )}

      {/* Order Rows Ledger */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <OrderRowSkeleton />
              </motion.div>
            ))
          ) : orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-12"
            >
              <Package size={48} className="mx-auto text-[#EAEAEA] mb-4" />
              <p className="text-[#787774]">Không tìm thấy đơn hàng nào</p>
            </motion.div>
          ) : (
            orders.map((order, index) => (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <OrderRow
                  order={order}
                  onClick={() => setSelectedOrder(order)}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Pagination */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 flex items-center justify-between border-t border-[#EAEAEA] pt-6"
      >
        <span className="text-xs font-mono text-[#787774] uppercase tracking-widest">
          {isLoading ? (
            "Đang tải..."
          ) : (
            <>Hiển thị {orders.length} của {totalDocs} đơn hàng</>
          )}
        </span>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={page === 1 || isLoading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="size-9 flex items-center justify-center rounded-lg border border-[#EAEAEA] text-[#ABABAB] hover:bg-[#F7F6F3] hover:text-[#111111] transition-colors disabled:opacity-20"
          >
            <ChevronLeft size={18} />
          </motion.button>
          <div className="flex items-center px-4 font-mono text-sm text-[#111111] font-bold">
            Trang {page} / {totalPages}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={page >= totalPages || isLoading}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="size-9 flex items-center justify-center rounded-lg border border-[#EAEAEA] text-[#ABABAB] hover:bg-[#F7F6F3] hover:text-[#111111] transition-colors disabled:opacity-20"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </motion.footer>

      {/* Detail Drawer */}
      <DetailDrawer
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrderData}
        onUpdateStatus={handleUpdateStatus}
        getNextStatuses={getNextStatuses}
        getStatusLabel={getStatusLabel}
        actionLoading={actionLoading}
      />
    </main>
  );
}
