import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  useGetCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../../../hooks/useCategory";
import type { TCategory, TFormCategory } from "../../../types/category.type";
import { CategoryHeader } from "./components/CategoryHeader";
import { CategoryStats } from "./components/CategoryStats";
import { CategoryItem } from "./components/CategoryItem";
import { CategoryDrawer } from "./components/CategoryDrawer";
import ConfirmModal from "../../../components/common/ConfirmModal";

const CategoryPage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TCategory | null>(
    null,
  );
  const [searchValue, setSearchValue] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<TFormCategory>({
    nameCategory: "",
    image: "",
    desc: "",
    status: "active",
  });

  // Fetch categories with search param
  const { data: categoriesResponse, isLoading } = useGetCategories({
    createSearch: searchValue,
  });

  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ nameCategory: "", image: "", desc: "", status: "active" });
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (category: TCategory) => {
    setEditingCategory(category);
    setFormData({
      nameCategory: category.nameCategory,
      image: category.image,
      desc: category.desc,
      status: category.status,
    });
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          ...editingCategory,
          ...formData,
        });
      } else {
        await addCategoryMutation.mutateAsync(formData);
      }
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategoryMutation.mutateAsync(categoryToDelete);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const categories = categoriesResponse?.data || [];

  return (
    <div className="min-h-screen bg-[#f9f9f8] text-[#2d3433] font-sans antialiased">
      <CategoryHeader onAdd={handleOpenAdd} />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <CategoryStats
          total={categories.length}
          active={categories.filter((c) => c.status === "active").length}
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
            {categories.map((category, index) => (
              <CategoryItem
                key={category._id}
                category={category}
                index={index}
                onEdit={handleOpenEdit}
                onDelete={(id) => setCategoryToDelete(id)}
                isDeleting={
                  deleteCategoryMutation.isPending &&
                  deleteCategoryMutation.variables === category._id
                }
              />
            ))}
          </motion.div>
        )}

        {/* Info text */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-6">
          <span className=" text-[10px] text-slate-400 uppercase tracking-widest">
            Hiển thị {categories.length} danh mục
          </span>
        </div>
      </main>

      <CategoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        editingCategory={editingCategory}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isPending={
          addCategoryMutation.isPending || updateCategoryMutation.isPending
        }
      />

      <ConfirmModal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleDelete}
        title="Xóa danh mục"
        description="Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác."
        isLoading={deleteCategoryMutation.isPending}
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

export default CategoryPage;
