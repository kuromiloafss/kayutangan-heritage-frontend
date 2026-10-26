import { useState } from "react";
import { mockCategories } from "@/features/category/data/categories.mock";
import type { CategoryData, CategoryFormData } from "@/types/category.types";

/** State daftar kategori beserta pencarian, filter, dan aksi tambah/edit/hapus. */
export function useCategories() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categoryList, setCategoryList] = useState<CategoryData[]>(mockCategories);

  const handleEdit = (item: CategoryData) => {
    alert(`Edit kategori: ${item.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus kategori ini?")) {
      setCategoryList(categoryList.filter((k) => k.id !== id));
    }
  };

  // Ikon & deskripsi belum disimpan karena tabel kategori hanya menampilkan nama & jumlah
  const handleAddNewCategory = (data: CategoryFormData) => {
    const newCategory: CategoryData = {
      id: Date.now(),
      name: data.name,
      count: 0,
    };
    setCategoryList([newCategory, ...categoryList]);
  };

  const filteredCategories = categoryList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.name.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredCategories,
    handleEdit,
    handleDelete,
    handleAddNewCategory,
  };
}
