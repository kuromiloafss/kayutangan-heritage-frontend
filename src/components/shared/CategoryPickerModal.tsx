
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryOption {
  id: number;
  name: string;
  icon: string;
}

interface CategoryPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
  selectedCategory?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function CategoryPickerModal({
  isOpen,
  onClose,
  onSelectCategory,
  selectedCategory,
}: CategoryPickerModalProps) {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mengambil kategori terbaru dari database setiap modal dibuka
  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();

    const fetchCategories = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}/categories`, {
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil daftar kategori."
          );
        }

        const categoryData: CategoryOption[] = (result.data || []).map(
          (item: any) => ({
            id: Number(item.id),
            name: item.name,
            icon: item.icon || "🏛️",
          })
        );

        setCategories(categoryData);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Error mengambil kategori:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Tidak dapat mengambil kategori."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchCategories();

    return () => controller.abort();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          {/* Modal */}
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-category-title"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-7 shadow-2xl z-10 select-none text-neutral-800 max-h-[92dvh] overflow-y-auto overscroll-contain"
          >
            {/* Header */}
            <header className="flex items-center justify-between mb-6">
              <h2
                id="modal-category-title"
                className="text-lg font-bold text-[#2a3821] tracking-tight"
              >
                Kategori
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup modal"
                className="text-neutral-400 hover:text-neutral-600 transition p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </header>

            {/* Loading */}
            {loading && (
              <div className="py-10 text-center text-sm text-neutral-500">
                Memuat kategori...
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="py-8 text-center">
                <p className="text-sm text-red-500">{error}</p>
                <button
                  type="button"
                  onClick={() => {
                    setCategories([]);
                    setError("");
                    // Tutup dan buka kembali modal untuk mengambil ulang data
                    onClose();
                  }}
                  className="mt-3 text-sm font-medium text-[#718255]"
                >
                  Tutup
                </button>
              </div>
            )}

            {/* Daftar Kategori */}
            {!loading && !error && categories.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {categories.map((item) => {
                  const isSelected =
                    selectedCategory?.toLowerCase() ===
                    item.name.toLowerCase();

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
            )}

            {/* Jika belum ada kategori */}
            {!loading && !error && categories.length === 0 && (
              <div className="py-10 text-center text-sm text-neutral-500">
                Belum ada kategori yang tersedia.
              </div>
            )}
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
