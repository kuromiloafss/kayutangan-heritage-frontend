
"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  CategoryData,
  CategoryFormData,
} from "@/types/category.types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function useCategories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [editingCategory, setEditingCategory] =
    useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(false);

  // Mengambil kategori dari database
  const loadCategories = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/categories`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal mengambil kategori.");
      }

      setCategoryList(
        (result.data || []).map((item: any) => ({
          id: Number(item.id),
          name: item.name,
          count: Number(item.count || 0),
          description: item.description || "",
          icon: item.icon || "🏛️",
        }))
      );
    } catch (error) {
      console.error("Error mengambil kategori:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Tidak dapat terhubung ke backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const handleEdit = (item: CategoryData) => {
    setEditingCategory(item);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  // Mengedit kategori
  const handleUpdateCategory = async (data: CategoryFormData) => {
    if (!editingCategory) return;

    try {
      const response = await fetch(
        `${API_URL}/categories/${editingCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal memperbarui kategori.");
      }

      await loadCategories();
      setEditingCategory(null);
      alert("Kategori berhasil diperbarui.");
    } catch (error) {
      console.error("Error memperbarui kategori:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui kategori."
      );
    }
  };

  // Menghapus kategori
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah kamu yakin ingin menghapus kategori ini?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus kategori.");
      }

      await loadCategories();
      alert("Kategori berhasil dihapus.");
    } catch (error) {
      console.error("Error menghapus kategori:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menghapus kategori."
      );
    }
  };

  // Menambahkan kategori baru
  const handleAddNewCategory = async (data: CategoryFormData) => {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menambahkan kategori.");
      }

      await loadCategories();
      alert("Kategori berhasil ditambahkan.");
    } catch (error) {
      console.error("Error menambahkan kategori:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menambahkan kategori."
      );
    }
  };

  const filteredCategories = categoryList.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

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
    editingCategory,
    loading,
    loadCategories,
    handleEdit,
    handleCancelEdit,
    handleUpdateCategory,
    handleDelete,
    handleAddNewCategory,
  };
}
