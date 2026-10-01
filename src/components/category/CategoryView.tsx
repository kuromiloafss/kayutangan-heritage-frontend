"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import CategoryHeader from "./CategoryHeader";
import CategoryTable, { CategoryData } from "./CategoryTable";
import AddCategoryModal from "./AddCategoryModal";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const initialCategories: CategoryData[] = [
  { id: 1, name: "Sejarah", count: 11 },
  { id: 2, name: "Kuliner", count: 8 },
  { id: 3, name: "Cafe", count: 14 },
  { id: 4, name: "Spot Foto", count: 9 },
  { id: 5, name: "Cinderamata", count: 5 },
  { id: 6, name: "Penginapan", count: 4 },
];

export default function CategoryView() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categoryList, setCategoryList] = useState<CategoryData[]>(initialCategories);

  // State buka-tutup modal Tambah Kategori
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleEdit = (item: CategoryData) => {
    alert(`Edit kategori: ${item.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus kategori ini?")) {
      setCategoryList(categoryList.filter((k) => k.id !== id));
    }
  };

  const handleAddNewCategory = (data: {
    name: string;
    description: string;
    icon: string;
  }) => {
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

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <CategoryHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        <CategoryTable
          data={filteredCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.section>

      {/* Pop-up Tambah Kategori dengan Live Preview */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddNewCategory}
      />
    </>
  );
}