import React, { useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import {
  useGetVouchers,
  useAddVoucher,
  useUpdateVoucher,
} from "../../../hooks/useVoucher";
import type { TVoucher, TFormVoucher } from "../../../types/voucher.type";
import {
  VoucherHeader,
  VoucherStats,
  VoucherItem,
  TableHeader,
  VoucherEmptyState,
  VoucherPagination,
  VoucherDrawer,
} from "./components";
interface VoucherFormData {
  code: string;
  discount: number;
  desc: string;
  startDate: string;
  endDate: string;
  voucherPrice: number;
  applicablePrice: number;
  status: "active" | "inactive";
}
const VoucherPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<TVoucher | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState<VoucherFormData>({
    code: "",
    discount: 0,
    desc: "",
    startDate: "",
    endDate: "",
    voucherPrice: 0,
    applicablePrice: 0,
    status: "active",
  });
  const {
    data: vouchersResponse,
    isLoading,
    error,
  } = useGetVouchers({
    createSearch: searchValue,
  });
  const addVoucherMutation = useAddVoucher();
  const updateVoucherMutation = useUpdateVoucher();
  const vouchers = useMemo(
    () => vouchersResponse?.data || [],
    [vouchersResponse?.data],
  );
  const paginatedVouchers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return vouchers.slice(start, start + itemsPerPage);
  }, [vouchers, currentPage]);
  const totalPages = Math.ceil(vouchers.length / itemsPerPage) || 1;
  const handleOpenAdd = () => {
    setEditingVoucher(null);
    setFormData({
      code: "",
      discount: 0,
      desc: "",
      startDate: "",
      endDate: "",
      voucherPrice: 0,
      applicablePrice: 0,
      status: "active",
    });
    setIsDrawerOpen(true);
  };
  const handleOpenEdit = (voucher: TVoucher) => {
    setEditingVoucher(voucher);
    setFormData({
      code: voucher.code,
      discount: voucher.discount,
      desc: voucher.desc,
      startDate: voucher.startDate ? voucher.startDate.split("T")[0] : "",
      endDate: voucher.endDate ? voucher.endDate.split("T")[0] : "",
      voucherPrice: voucher.voucherPrice,
      applicablePrice: voucher.applicablePrice,
      status: voucher.status,
    });
    setIsDrawerOpen(true);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.startDate || !formData.endDate) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }
    try {
      if (editingVoucher) {
        await updateVoucherMutation.mutateAsync({
          ...editingVoucher,
          ...formData,
        } as TVoucher);
      } else {
        await addVoucherMutation.mutateAsync(formData as TFormVoucher);
      }
      setIsDrawerOpen(false);
    } catch (err) {
      console.error("Thao tác thất bại:", err);
      alert("Thao tác thất bại. Vui lòng thử lại.");
    }
  };
  return (
    <div className="min-h-screen bg-[#f9f9f8] text-slate-900 font-sans antialiased">
      <VoucherHeader onAdd={handleOpenAdd} />
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <VoucherStats
          total={vouchers.length}
          active={vouchers.filter((v) => v.status === "active").length}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        {}
        {isLoading && (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-slate-300" size={32} />
          </div>
        )}
        {}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-red-600 text-sm">
              Không thể tải dữ liệu. Vui lòng thử lại sau.
            </p>
          </div>
        )}
        {}
        {!isLoading && !error && (
          <>
            {vouchers.length === 0 ? (
              <VoucherEmptyState onAdd={handleOpenAdd} />
            ) : (
              <div className="space-y-4">
                <TableHeader />
                <div className="flex flex-col gap-4">
                  {paginatedVouchers.map((voucher, index) => (
                    <VoucherItem
                      key={voucher._id}
                      voucher={voucher}
                      index={index}
                      onEdit={handleOpenEdit}
                    />
                  ))}
                </div>
              </div>
            )}
            {vouchers.length > 0 && (
              <VoucherPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>
      <VoucherDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        editingVoucher={editingVoucher}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isPending={
          addVoucherMutation.isPending || updateVoucherMutation.isPending
        }
      />
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
export default VoucherPage;
