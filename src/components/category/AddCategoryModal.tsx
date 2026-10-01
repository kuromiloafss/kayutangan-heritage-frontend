"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    description: string;
    icon: string;
  }) => void;
}

interface AvailableIcon {
  id: string;
  label: string;
  icon: string;
}

const AVAILABLE_ICONS: AvailableIcon[] = [
  { id: "all", label: "Semua", icon: "🍽️" },
  { id: "spot_foto", label: "Spot Foto", icon: "📷" },
  { id: "kuliner", label: "Kuliner", icon: "🍴" },
  { id: "cafe", label: "Cafe", icon: "☕" },
  { id: "cinderamata", label: "Cinderamata", icon: "🎁" },
  { id: "sejarah", label: "Sejarah", icon: "🏛️" },
];

export default function AddCategoryModal({
  isOpen,
  onClose,
  onSubmit,
}: AddCategoryModalProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("🏛️");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      icon: selectedIcon,
    });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setSelectedIcon("🏛️");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Blur Gelap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          {/* Container Modal */}
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-add-category-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-neutral-800 my-8"
          >
            {/* Header Modal */}
            <header className="flex items-start justify-between mb-6">
              <div>
                <h2
                  id="modal-add-category-title"
                  className="text-xl font-bold text-[#2a3821] tracking-tight"
                >
                  Tambah Kategori
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-normal">
                  Lengkapi informasi kategori tempat.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Tutup modal"
                className="text-neutral-400 hover:text-neutral-600 transition p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {/* Form & Grid Layout */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Kolom Kiri: Input Fields */}
                <div className="md:col-span-7 space-y-4">
                  {/* 1. Nama Kategori */}
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
                      placeholder="Contoh: Cafe"
                      className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                    />
                  </div>

                  {/* 2. Deskripsi */}
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
                        placeholder="Tambah deskripsi tempat"
                        className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition resize-none pb-6"
                      />
                      <span className="absolute bottom-2 right-3 text-[10px] text-neutral-400">
                        {description.length}/500
                      </span>
                    </div>
                  </div>

                  {/* 3. Pilihan Ikon Kategori */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">
                      Ikon Kategori
                    </label>
                    <div className="grid grid-cols-4 gap-2 bg-[#f6f7f8] border border-neutral-200/80 rounded-2xl p-3">
                      {AVAILABLE_ICONS.map((item) => {
                        const isSelected = selectedIcon === item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedIcon(item.icon)}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-white border-[#718255] shadow-xs ring-1 ring-[#718255]"
                                : "bg-transparent border-transparent hover:bg-neutral-200/50"
                            }`}
                          >
                            <span className="text-lg mb-1">{item.icon}</span>
                            <span className="text-[10px] font-medium text-neutral-600 truncate max-w-full">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan: Preview Card */}
                <div className="md:col-span-5 h-full">
                  <div className="bg-[#f6f7f8] border border-neutral-200/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[290px] h-full">
                    <span className="text-[11px] font-semibold text-neutral-500 self-start mb-6">
                      Preview
                    </span>

                    {/* Circle Avatar Preview Icon */}
                    <div className="w-20 h-20 rounded-full bg-white border border-neutral-200/70 shadow-sm flex items-center justify-center text-3xl mb-4">
                      {selectedIcon}
                    </div>

                    {/* Preview Nama & Deskripsi */}
                    <h3 className="text-sm font-bold text-neutral-800 break-words max-w-full">
                      {name || "Nama Kategori"}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed break-words max-w-full line-clamp-3">
                      {description || "Deskripsi kategori akan muncul di sini."}
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer Tombol Aksi */}
              <footer className="flex items-center justify-end gap-2.5 pt-4 border-t border-neutral-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 text-xs font-medium text-neutral-600 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition cursor-pointer"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-2 text-xs font-medium text-white bg-[#718255] hover:bg-[#607044] rounded-xl shadow-sm transition cursor-pointer"
                >
                  Simpan
                </motion.button>
              </footer>
            </form>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}