"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ManagementHeader from "@/components/shared/ManagementHeader";
import { pageEnterVariants } from "@/lib/animations";
import { useCategories } from "@/hooks/useCategories";
import CategoryTable from "./CategoryTable";
import AddCategoryModal from "./AddCategoryModal";

export default function CategoryView() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredCategories,
    handleEdit,
    handleDelete,
    handleAddNewCategory,
  } = useCategories();

  // State buka-tutup modal Tambah Kategori
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <>
      <motion.section
        variants={pageEnterVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <ManagementHeader
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          }
          title="Kelola Kategori"
          description="Kelola kategori tempat wisata."
          addLabel="Tambah Kategori"
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
