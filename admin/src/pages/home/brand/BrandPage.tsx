import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  useGetBrands,
  useAddBrand,
  useUpdateBrand,
} from "../../../hooks/useBrand";
import type { TBrand, TFormBrand } from "../../../types/brand.type";
import { BrandHeader } from "./components/BrandHeader";
import { BrandStats } from "./components/BrandStats";
import { BrandItem } from "./components/BrandItem";
import { BrandDrawer } from "./components/BrandDrawer";

const BrandPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<TBrand | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [formData, setFormData] = useState<TFormBrand>({
    nameBrand: "",
    image: "",
    desc: "",
    status: "active",
  });

  const { data: brandsResponse, isLoading } = useGetBrands({
    createSearch: searchValue,
  });
  const addBrandMutation = useAddBrand();
  const updateBrandMutation = useUpdateBrand();

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setFormData({ nameBrand: "", image: "", desc: "", status: "active" });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (brand: TBrand) => {
    setEditingBrand(brand);
    setFormData({
      nameBrand: brand.nameBrand,
      image: brand.image,
      desc: brand.desc,
      status: brand.status,
    });
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBrand) {
        await updateBrandMutation.mutateAsync({
          ...editingBrand,
          ...formData,
        });
      } else {
        await addBrandMutation.mutateAsync(formData);
      }
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const brands = brandsResponse?.data || [];

  return (
    <div className="min-h-screen bg-[#f9f9f8] text-[#2d3433] font-sans antialiased">
      <BrandHeader onAdd={handleOpenAdd} />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <BrandStats
          total={brands.length}
          active={brands.filter((b) => b.status === "active").length}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-slate-300" size={32} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {brands.map((brand, index) => (
              <BrandItem
                key={brand._id}
                brand={brand}
                index={index}
                onEdit={handleOpenEdit}
              />
            ))}
          </motion.div>
        )}

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-6">
          <span className=" text-[10px] text-slate-400 uppercase tracking-widest">
            Hiển thị 1 - {brands.length} của {brands.length} thương hiệu
          </span>
        </div>
      </main>

      <BrandDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        editingBrand={editingBrand}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isPending={addBrandMutation.isPending || updateBrandMutation.isPending}
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

export default BrandPage;
