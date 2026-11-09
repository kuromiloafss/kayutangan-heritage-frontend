
"use client";

import React, { useEffect, useState } from "react";
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
    editingCategory,
    handleEdit,
    handleCancelEdit,
    handleUpdateCategory,
    handleDelete,
    handleAddNewCategory,
  } = useCategories();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Kembali ke halaman pertama saat pencarian atau filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Menyesuaikan halaman jika data berkurang setelah dihapus
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    handleCancelEdit();
  };

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
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2H6V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 6a2 2 0 012-2h2a2 2 0 012 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2-2v-2z"
              />
            </svg>
          }
          title="Kelola Kategori"
          description="Kelola kategori tempat wisata."
          addLabel="Tambah Kategori"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddClick={() => {
            handleCancelEdit();
            setIsAddModalOpen(true);
          }}
        />

        <CategoryTable
          data={currentCategories}
          onEdit={(item) => {
            setIsAddModalOpen(false);
            handleEdit(item);
          }}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {filteredCategories.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Menampilkan {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, filteredCategories.length)}{" "}
              dari {filteredCategories.length} kategori
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.section>

      <AddCategoryModal
        key={editingCategory?.id ?? "new"}
        isOpen={isAddModalOpen || editingCategory !== null}
        onClose={handleCloseModal}
        onSubmit={(data) => {
          if (editingCategory) {
            handleUpdateCategory(data);
          } else {
            handleAddNewCategory(data);
          }

          setIsAddModalOpen(false);
        }}
        editData={editingCategory}
      />
    </>
  );
}
