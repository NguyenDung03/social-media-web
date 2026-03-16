import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, ArrowRight, Lock, Gift, X, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VoucherList from "./Voucher";
import { formatCurrency } from "@/lib/utils";

export default function CartSummarySidebar({
  totalQuantity,
  subtotal,
  taxAmount,
  totalAmount,
  selectedCount,
  selectedVoucher,
  setSelectedVoucher,
}) {
  const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false);
  const [couponInput, setCouponInput] = useState("");

  const handleApplyVoucher = (voucher) => {
    setSelectedVoucher(voucher);
    setIsVoucherDialogOpen(false);
  };

  const removeVoucher = () => {
    setSelectedVoucher(null);
  };

  return (
    <div className="sticky top-24 space-y-4">
      {/* Promo Code Box */}
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-pink-500" />
            <span className="font-bold">Mã giảm giá</span>
          </div>
          <button
            onClick={() => setIsVoucherDialogOpen(true)}
            className="mr-2 text-xs font-bold text-black hover:text-pink-600 transition-colors"
          >
            Chọn mã ưu đãi
          </button>
        </div>

        <AnimatePresence mode="wait">
          {selectedVoucher ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="group relative flex items-center justify-between bg-pink-50 dark:bg-pink-500/10 p-4 rounded-xl border border-pink-100 dark:border-pink-500/20"
            >
              <div className="flex items-center gap-3">
                <Ticket className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-sm font-black text-pink-600 dark:text-pink-400 uppercase">
                    {selectedVoucher.code}
                  </p>
                  <p className="text-[10px] text-pink-500/70 font-bold">
                    Đã giảm {formatCurrency(selectedVoucher.voucherPrice)}đ
                  </p>
                </div>
              </div>
              <button
                onClick={removeVoucher}
                className="p-1.5 rounded-full hover:bg-pink-100 dark:hover:bg-pink-500/20 text-pink-400 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2"
            >
              <Input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-6 text-sm focus-visible:ring-pink-300"
                placeholder="Nhập mã..."
                type="text"
              />
              <Button
                onClick={() => setIsVoucherDialogOpen(true)}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-white font-bold h-auto px-6 py-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-500 transition-all text-sm border-none shadow-none"
              >
                Áp dụng
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog
          open={isVoucherDialogOpen}
          onOpenChange={setIsVoucherDialogOpen}
        >
          <DialogContent className="max-w-md bg-[#f8f6f6] dark:bg-[#1a1a1a] rounded-3xl border-none p-0 overflow-hidden">
            <DialogHeader className="p-6 bg-white dark:bg-black/20 border-b border-slate-100 dark:border-slate-800">
              <DialogTitle className="text-xl font-black flex items-center gap-3">
                <Gift className="w-6 h-6 text-pink-500" />
                Kho Voucher Của Bạn
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <VoucherList
                onSelectedVoucher={handleApplyVoucher}
                currentVoucherId={selectedVoucher?._id}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Box */}
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
        <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Tạm tính ({totalQuantity} sản phẩm)</span>
            <span>{subtotal.toLocaleString("vi-VN")} VND</span>
          </div>

          {selectedVoucher && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex justify-between items-center text-pink-500 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <Ticket className="w-4 h-4" />
                <span>Giảm giá voucher</span>
              </div>
              <span>-{formatCurrency(selectedVoucher.voucherPrice)} VND</span>
            </motion.div>
          )}

          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Phí vận chuyển</span>
            <span className="text-green-500 font-medium">MIỄN PHÍ</span>
          </div>
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>Thuế (1%)</span>
            <span>{taxAmount.toLocaleString("vi-VN")} VND</span>
          </div>

          <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-700 flex justify-between items-end">
            <span className="font-bold text-lg">Tổng cộng</span>
            <div className="text-right">
              <span className="block text-2xl font-black bg-gradient-to-r from-yellow-400 to-pink-600 bg-clip-text text-transparent">
                {totalAmount.toLocaleString("vi-VN")} VND
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Đã bao gồm VAT (nếu có)
              </span>
            </div>
          </div>
        </div>

        <Button
          disabled={selectedCount === 0}
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed h-auto bg-gradient-to-r from-yellow-300 to-pink-500 text-white py-5 rounded-full font-bold text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border-none"
        >
          Thanh toán ({selectedCount})
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Secure Payment */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <img
              alt="Visa"
              className="h-4"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHoFgHuQrqLgI5arwKmsNzitARrxN42fMkbm2OC5Cw_Fz69U0wxMottcZ9Pq85kVmRhpekgQ2te38Js7rQUalv0vuNDLKMa7dwE6n1lUKJkU-Xc7GchdHZBFTLAmTCAKB9bZiKX1yQT3J1v61LOn9kLX24zVyTy6rLDz_ONMxbDTULn8yWYLtTAuNIE3oGh9-Inagt6tOC1Kgk9zkkCr3Ha-vKIEX3NcxGHND64cEG7QohExz1swXQjrOC_A11s3fPkYl0bQchbBc"
            />
            <img
              alt="Mastercard"
              className="h-6"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3y-XQyh4fdOpZD5midprXVl5RkiLKJXAj4omMpfTOW20AHFNMFNj8qs15gqzfIBpjlKyvjDmtJCEAGLfON7cPogzYEGxqXlknxMJ9VPIc-5VZBMO1h80JN6Bvm4g9-J60zrn4f_xh2i7_dmQkRjQ70agNp7Vf2ZVvZy_juChoqtmx1CzhxKgzXwpSOkvUnJ8INHuhDGH4GHxuEDYdDIDzOlEFa1m_HOVX8aGYtm-qKu1sMUD6upnnljUL0MXtNxMQgO3odke0SnM"
            />
            <img
              alt="PayPal"
              className="h-4"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqcUBhDOy--FGr74AyMF6dhpk6uP0PgW2kv39NW6mChDis__6Z_vKgHL_dJU4DxizhHJiv3tZAPHtryry4g8BJTc0hYQTu5I2lYkPAGP8m1rGHqDYYyRK1PXMYc_4xEmqwh2wkoFXhfO6XUql1f4xoOqgxqP9L-9sRNdRDk-KO8U4qXNIl2aHm6sj1EqPkGU58auqBiapIdgCOgpjj8AC_YNujlvGoQMo8tDw2_XJlIKMQeSKpQYoEN2NoMv1y1gEb-9wG07_tAKs"
            />
          </div>
          <p className="text-[10px] text-slate-400 flex items-center gap-1 uppercase tracking-widest font-bold">
            <Lock className="w-3 h-3" />
            Thanh toán an toàn qua Cổng thanh toán
          </p>
        </div>
      </div>

      {/* Join Club Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white shadow-lg">
        <div className="relative z-10">
          <h5 className="font-bold text-lg mb-1">Tham gia Câu lạc bộ</h5>
          <p className="text-slate-400 text-xs mb-4">
            Nhận ưu đãi 20% cho đơn hàng tiếp theo và miễn phí vận chuyển trọn
            đời.
          </p>
          <button className="text-xs font-bold bg-white text-slate-900 px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-yellow-300 hover:to-pink-500 hover:text-white transition-colors">
            Tìm hiểu thêm
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12">
          <Gift className="w-32 h-32" />
        </div>
      </div>
    </div>
  );
}
