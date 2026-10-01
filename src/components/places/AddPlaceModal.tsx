"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CategoryModal from "./CategoryModal";

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    category: string;
    description: string;
    image: string;
    location: string;
  }) => void;
}

export default function AddPlaceModal({
  isOpen,
  onClose,
  onSubmit,
}: AddPlaceModalProps) {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // State untuk pop-up kategori
  const [isCatModalOpen, setIsCatModalOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      category: category || "Sejarah",
      description,
      image: imagePreview || "/images/gereja_kayutangan.png",
      location,
    });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setCategory("");
    setDescription("");
    setLocation("");
    setImagePreview(null);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
            />

            <motion.article
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-neutral-800 my-8"
            >
              <header className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#2a3821] tracking-tight">
                    Tambah Tempat
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1 font-normal">
                    Isi detail tempat wisata yang akan di tambahkan.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-neutral-400 hover:text-neutral-600 transition p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </header>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Nama Tempat */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Nama Tempat
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Cafe"
                    className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                  />
                </div>

                {/* 2. Kategori -> Klik tombol ini membuka CategoryModal */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Kategori
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCatModalOpen(true)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-left focus:outline-none focus:ring-2 focus:ring-[#718255] transition cursor-pointer"
                  >
                    <span className={category ? "text-neutral-800 font-medium" : "text-neutral-400"}>
                      {category || "Pilih Kategori"}
                    </span>
                    <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* 3. Deskripsi */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Deskripsi
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tambah deskripsi tempat"
                    className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition resize-none"
                  />
                </div>

                {/* 4. Gambar & Lokasi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Gambar
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-36 border border-neutral-200/90 rounded-2xl bg-[#f6f7f8] flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-neutral-100 transition relative overflow-hidden group"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imagePreview}
                            alt="Preview Tempat"
                            fill
                            className="object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[11px] font-medium">
                            Ganti Gambar
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-neutral-400 font-normal leading-relaxed">
                          Klik untuk mengunggah gambar
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Lokasi
                    </label>
                    <div className="space-y-2">
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-neutral-400 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Pilih lokasi di peta"
                          className="w-full pl-9 pr-3.5 py-2 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                        />
                      </div>
                      <div className="w-full h-24 border border-neutral-200/90 rounded-2xl bg-[#f6f7f8] flex items-center justify-center p-3 text-center">
                        <span className="text-[11px] text-neutral-400">
                          Pratinjau peta / koordinat
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <footer className="flex items-center justify-end gap-2.5 pt-4">
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

      {/* Pop-up Grid Kartu Kategori */}
      <CategoryModal
        isOpen={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
        onSelectCategory={(catName) => setCategory(catName)}
        selectedCategory={category}
      />
    </>
  );
}