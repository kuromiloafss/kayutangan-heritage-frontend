"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CategoryItem {
  id: string;
  name: string;
  icon: string; // Emoji 3D / Icon
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
  selectedCategory?: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: "spot_foto", name: "Spot Foto", icon: "📸" },
  { id: "kuliner", name: "Kuliner", icon: "🍜" },
  { id: "cafe", name: "Cafe", icon: "☕" },
  { id: "cinderamata", name: "Cinderamata", icon: "🎁" },
  { id: "sejarah", name: "Sejarah", icon: "🏯" },
  { id: "toilet", name: "Toilet", icon: "🚻" },
  { id: "mesjid", name: "Mesjid", icon: "🕌" },
  { id: "penginapan", name: "Penginapan", icon: "🏨" },
];

export default function CategoryModal({
  isOpen,
  onClose,
  onSelectCategory,
  selectedCategory,
}: CategoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Gelap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          {/* Kontainer Modal Semantik */}
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-category-title"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10 select-none text-neutral-800"
          >
            {/* Header Modal */}
            <header className="flex items-center justify-between mb-6">
              <h2
                id="modal-category-title"
                className="text-lg font-bold text-[#2a3821] tracking-tight"
              >
                Kategori
              </h2>

              {/* Tombol Tutup Silang */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup modal"
                className="text-neutral-400 hover:text-neutral-600 transition p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {/* Grid 3 Kolom Kartu Kategori */}
            <div className="grid grid-cols-3 gap-3">
              {CATEGORIES.map((item) => {
                const isSelected = selectedCategory === item.name;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => {
                      onSelectCategory(item.name);
                      onClose();
                    }}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all cursor-pointer aspect-square ${
                      isSelected
                        ? "bg-[#f5f6f3] border-[#718255] shadow-sm"
                        : "bg-[#fbfbfa] border-neutral-200/60 hover:border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    <span className="text-2xl mb-1.5 filter drop-shadow-sm">
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-700 text-center leading-tight">
                      {item.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}