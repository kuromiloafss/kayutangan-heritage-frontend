"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CategoryModal from "./CategoryModal";

interface PlacesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onAddClick: () => void;
}

export default function PlacesHeader({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onAddClick,
}: PlacesHeaderProps) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  // Fungsi reset kategori kembali ke "all"
  const handleResetCategory = (e: React.MouseEvent) => {
    e.stopPropagation(); // Biar modalnya gak ikut kebuka
    onCategoryChange("all");
  };

  const isFiltered = selectedCategory !== "all" && selectedCategory !== "";

  return (
    <>
      <header className="space-y-5 mb-6">
        {/* Baris Atas: Judul Halaman & Tombol Tambah Tempat */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-neutral-600 shrink-0 border border-neutral-200/60 mt-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2a3821] tracking-tight">
                Kelola Tempat
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">
                Kelola data wisata yang tersedia di aplikasi.
              </p>
            </div>
          </div>

          {/* Tombol Tambah Tempat */}
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
            <span>Tambah Tempat</span>
          </motion.button>
        </div>

        {/* Baris Bawah: Input Search & Tombol Kategori */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Search Bar */}
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

          {/* Tombol Kategori + Tombol Reset (X) */}
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
                {/* Tombol Reset (X) jika kategori sedang terpilih */}
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

                {/* Ikon Panah Dropdown */}
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Pop-up Modal Kategori */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelectCategory={(cat) => onCategoryChange(cat)}
        selectedCategory={selectedCategory}
      />
    </>
  );
}