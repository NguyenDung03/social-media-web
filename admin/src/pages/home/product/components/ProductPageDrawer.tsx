import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "@phosphor-icons/react";
import type { TProduct, TProductForm } from "../../../../types/product.type";
import type { TImage } from "../../../../types/common.type";
import { useGetCategories } from "../../../../hooks/useCategory";
import { useGetBrands } from "../../../../hooks/useBrand";

interface ProductPageDrawerProps {
  isOpen: boolean;
  editingProduct: TProduct | null;
  formData: Partial<TProductForm>;
  onClose: () => void;
  onFormChange: (data: Partial<TProductForm>) => void;
  onSubmit: () => void;
}

const ProductPageDrawer: React.FC<ProductPageDrawerProps> = ({
  isOpen,
  editingProduct,
  formData,
  onClose,
  onFormChange,
  onSubmit,
}) => {
  // Fetch categories and brands for dropdowns
  const { data: categoriesData } = useGetCategories();
  const { data: brandsData } = useGetBrands();
  const categories = categoriesData?.data || [];
  const brands = brandsData?.data || [];

  // Get images from formData or editing product
  const images: TImage[] =
    (formData.images as TImage[]) || editingProduct?.images || [];
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      const newImage = {
        url: imageUrl.trim(),
        public_id: `manual_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      } as TImage;
      onFormChange({
        ...formData,
        images: [...images, newImage],
      });
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onFormChange({
      ...formData,
      images: updatedImages,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111111]/30 backdrop-blur-sm z-50 pointer-events-auto"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-[60] flex flex-col border-l border-[#EAEAEA]"
          >
            <div className="px-8 py-6 border-b border-[#EAEAEA] flex items-center justify-between">
              <h3 className="text-2xl font-light tracking-tight text-[#111111]">
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#F7F6F3] rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#787774]">
                  Hình ảnh sản phẩm
                </p>
                {/* Input link ảnh */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 border border-[#EAEAEA] rounded-lg text-sm focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 outline-none transition-all"
                    placeholder="Nhập link ảnh..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddImage()}
                  />
                  <button
                    onClick={handleAddImage}
                    className="px-4 py-3 bg-[#111111] text-white rounded-lg hover:bg-[#333333] transition-colors"
                  >
                    <Upload size={18} />
                  </button>
                </div>
                {/* Preview ảnh */}
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden border border-[#EAEAEA]"
                      >
                        <img
                          src={img.url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/150?text=Error";
                          }}
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {images.length === 0 && (
                  <div className="aspect-video w-full rounded-2xl border-2 border-dashed border-[#EAEAEA] bg-[#F7F6F3] flex flex-col items-center justify-center gap-2">
                    <p className="text-sm text-[#787774]">Chưa có ảnh nào</p>
                    <p className="text-xs text-[#ABABAB]">
                      Nhập link ảnh bên trên
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#787774]">
                    Tên sản phẩm
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 outline-none text-sm font-medium text-[#111111] transition-all"
                    placeholder="Nhập tên sản phẩm"
                    value={formData.nameProduct || ""}
                    onChange={(e) =>
                      onFormChange({
                        ...formData,
                        nameProduct: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#787774]">
                    Giá bán (₫)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg font-mono text-sm text-[#111111] font-bold focus:border-[#111111] outline-none"
                    placeholder="0"
                    value={formData.price || ""}
                    onChange={(e) =>
                      onFormChange({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#787774]">
                    Giảm giá (%)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg font-mono text-sm text-[#111111] focus:border-[#111111] outline-none"
                    placeholder="0"
                    value={formData.sale || 0}
                    onChange={(e) =>
                      onFormChange({
                        ...formData,
                        sale: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#787774]">
                    Mô tả
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/10 outline-none text-sm text-[#111111] transition-all min-h-[100px]"
                    placeholder="Nhập mô tả sản phẩm"
                    value={formData.desc || ""}
                    onChange={(e) =>
                      onFormChange({ ...formData, desc: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#787774]">
                    Danh mục <span className="text-red-400">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg text-sm text-[#111111] focus:border-[#111111] outline-none"
                    value={formData.category || ""}
                    onChange={(e) =>
                      onFormChange({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.nameCategory}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#787774]">
                    Thương hiệu <span className="text-red-400">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg text-sm text-[#111111] focus:border-[#111111] outline-none"
                    value={formData.brand || ""}
                    onChange={(e) =>
                      onFormChange({
                        ...formData,
                        brand: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Chọn thương hiệu --</option>
                    {brands.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.nameBrand}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#787774]">
                    Trạng thái
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg text-sm text-[#111111] focus:border-[#111111] outline-none"
                    value={formData.status || "active"}
                    onChange={(e) =>
                      onFormChange({
                        ...formData,
                        status: e.target.value as "active" | "inactive",
                      })
                    }
                  >
                    <option value="active">Đang hoạt động</option>
                    <option value="inactive">Tạm ngưng</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 border-t border-[#EAEAEA] flex gap-4 bg-[#F7F6F3]/50">
              <button
                onClick={onSubmit}
                className="flex-1 bg-[#111111] text-white py-4 rounded-lg font-medium active:scale-[0.98] transition-all"
              >
                {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
              </button>
              <button
                onClick={onClose}
                className="px-8 py-4 border border-[#EAEAEA] bg-white rounded-lg font-medium hover:bg-[#F7F6F3] transition-all"
              >
                Hủy
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductPageDrawer;
