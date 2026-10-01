"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CategoryModal from "../places/CategoryModal";

interface RuteHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onAddClick: () => void;
}

export default function RuteHeader({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onAddClick,
}: RuteHeaderProps) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  const handleResetCategory = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCategoryChange("all");
  };

  const isFiltered = selectedCategory !== "all" && selectedCategory !== "";

  return (
    <>
      <header className="space-y-5 mb-6">
        {/* Baris Atas: Judul & Tombol Tambah */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-neutral-600 shrink-0 border border-neutral-200/60 mt-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2a3821] tracking-tight">
                Kelola Rute
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">
                Kelola rute wisata yang tersedia untuk pengunjung.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onAddClick}
            className="flex items-center gap-2 bg-[#2b3a24] hover:bg-[#212d1b] text-white px-4 py-2.5 rounded-xl text-xs font-medium shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Tambah Rute</span>
          </motion.button>
        </div>

        {/* Baris Bawah: Pencarian & Filter Kategori */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          <div className="md:col-span-8 lg:col-span-9 relative flex items-center">
            <span className="absolute left-4 text-neutral-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari tempat, pengguna, atau laporan..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-neutral-200/90 rounded-2xl text-xs text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] transition shadow-sm"
            />
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={() => setIsCategoryModalOpen(true)}
              className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-2xl text-xs shadow-sm hover:bg-neutral-50 transition cursor-pointer ${
                isFiltered
                  ? "border-[#718255] text-[#2a3821] font-semibold"
                  : "border-neutral-200/90 text-neutral-600"
              }`}
            >
              <span className="truncate">
                {isFiltered ? selectedCategory : "Semua Kategori"}
              </span>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {isFiltered && (
                  <span
                    onClick={handleResetCategory}
                    title="Reset Kategori"
                    className="p-0.5 rounded-full hover:bg-neutral-200/80 text-neutral-400 hover:text-neutral-700 transition"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelectCategory={(cat) => onCategoryChange(cat)}
        selectedCategory={selectedCategory}
      />
    </>
  );
}