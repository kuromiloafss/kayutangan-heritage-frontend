"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  CategoryData,
  CategoryFormData,
} from "@/types/category.types";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CategoryFormData) => void;
  editData?: CategoryData | null;
}

const DEFAULT_ICON = "📍";

export default function AddCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(DEFAULT_ICON);

  // Mengisi data ketika modal edit dibuka
  useEffect(() => {
    if (isOpen && editData) {
      setName(editData.name);
      setDescription(editData.description || "");
      setSelectedIcon(editData.icon || DEFAULT_ICON);
    } else if (isOpen) {
      setName("");
      setDescription("");
      setSelectedIcon(DEFAULT_ICON);
    }
  }, [isOpen, editData]);

  // Mengosongkan form ketika modal ditutup
  const handleClose = () => {
    setName("");
    setDescription("");
    setSelectedIcon(DEFAULT_ICON);
    onClose();
  };

  // Menyimpan kategori
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedIcon = selectedIcon.trim();

    if (!trimmedName || !trimmedIcon) return;

    onSubmit({
      name: trimmedName,
      description: description.trim(),
      icon: trimmedIcon,
    });

    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          {/* Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          {/* Modal */}
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-add-category-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-8 shadow-2xl z-10 text-neutral-800 max-h-[92dvh] overflow-y-auto overscroll-contain"
          >
            {/* Header */}
            <header className="flex items-start justify-between mb-6">
              <div>
                <h2
                  id="modal-add-category-title"
                  className="text-xl font-bold text-[#2a3821] tracking-tight"
                >
                  {editData ? "Edit Kategori" : "Tambah Kategori"}
                </h2>

                <p className="text-xs text-neutral-400 mt-1">
                  {editData
                    ? "Ubah informasi kategori tempat."
                    : "Lengkapi informasi kategori tempat."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-4">
                  {/* Nama Kategori */}
                  <div>
                    <label
                      htmlFor="catName"
                      className="block text-xs font-semibold text-neutral-700 mb-1.5"
                    >
                      Nama Kategori
                    </label>

                    <input
                      id="catName"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Bunga"
                      className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                    />
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label
                      htmlFor="catDescription"
                      className="block text-xs font-semibold text-neutral-700 mb-1.5"
                    >
                      Deskripsi
                    </label>

                    <div className="relative">
                      <textarea
                        id="catDescription"
                        rows={3}
                        maxLength={500}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tambah deskripsi kategori"
                        className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition resize-none pb-6"
                      />

                      <span className="absolute bottom-2 right-3 text-[10px] text-neutral-400">
                        {description.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Input Emoji Bebas */}
                  <div>
                    <label
                      htmlFor="catIcon"
                      className="block text-xs font-semibold text-neutral-700 mb-1.5"
                    >
                      Ikon Kategori
                    </label>

                    <div className="flex gap-3 items-center">
                      <input
                        id="catIcon"
                        type="text"
                        required
                        value={selectedIcon}
                        onChange={(e) => setSelectedIcon(e.target.value)}
                        placeholder="Masukkan emoji, contoh: 🌸"
                        className="flex-1 min-w-0 px-3.5 py-3 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-lg text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                      />

                      <div className="w-12 h-12 shrink-0 rounded-xl bg-[#f6f7f8] border border-neutral-200 flex items-center justify-center text-2xl">
                        {selectedIcon || "?"}
                      </div>
                    </div>

                    <p className="text-[10px] text-neutral-400 mt-2">
                      Kamu bebas menggunakan emoji apa pun. Di Windows,
                      tekan Win + . untuk membuka panel emoji.
                    </p>
                  </div>
                </div>

                {/* Preview */}
                <div className="md:col-span-5 h-full">
                  <div className="bg-[#f6f7f8] border border-neutral-200/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[200px] md:min-h-[290px] h-full">
                    <span className="text-[11px] font-semibold text-neutral-500 self-start mb-4 md:mb-6">
                      Preview
                    </span>

                    <div className="w-20 h-20 rounded-full bg-white border border-neutral-200/70 shadow-sm flex items-center justify-center text-3xl mb-4">
                      {selectedIcon || "?"}
                    </div>

                    <h3 className="text-sm font-bold text-neutral-800 break-words max-w-full">
                      {name || "Nama Kategori"}
                    </h3>

                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed break-words max-w-full line-clamp-3">
                      {description ||
                        "Deskripsi kategori akan muncul di sini."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tombol */}
              <footer className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2.5 pt-4 border-t border-neutral-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 sm:py-2 text-sm sm:text-xs font-medium text-neutral-600 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition cursor-pointer"
                >
                  Batal
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 sm:py-2 text-sm sm:text-xs font-medium text-white bg-[#718255] hover:bg-[#607044] rounded-xl shadow-sm transition cursor-pointer"
                >
                  {editData ? "Simpan Perubahan" : "Simpan"}
                </motion.button>
              </footer>
            </form>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
