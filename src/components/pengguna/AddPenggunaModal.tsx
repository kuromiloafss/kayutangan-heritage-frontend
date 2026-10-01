"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AddPenggunaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => void;
}

export default function AddPenggunaModal({
  isOpen,
  onClose,
  onSubmit,
}: AddPenggunaModalProps) {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fullName,
      email,
      phoneNumber,
      password,
    });
    handleClose();
  };

  const handleClose = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
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

          {/* Kontainer Modal Card */}
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-add-user-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-neutral-800 my-8"
          >
            {/* Header Modal */}
            <header className="flex items-start justify-between mb-6">
              <div>
                <h2
                  id="modal-add-user-title"
                  className="text-xl font-bold text-[#2a3821] tracking-tight"
                >
                  Tambah Pengguna
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-normal">
                  Lengkapi informasi pengguna yang akan ditambahkan.
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

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Nama Lengkap */}
              <div>
                <label
                  htmlFor="userFullName"
                  className="block text-xs font-semibold text-neutral-700 mb-1.5"
                >
                  Nama Lengkap
                </label>
                <input
                  id="userFullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                />
              </div>

              {/* 2. Email */}
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-xs font-semibold text-neutral-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="userEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Contoh@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                />
              </div>

              {/* 3. Nomor Telepon */}
              <div>
                <label
                  htmlFor="userPhone"
                  className="block text-xs font-semibold text-neutral-700 mb-1.5"
                >
                  Nomor Telepon
                </label>
                <input
                  id="userPhone"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Contoh: 128172372"
                  className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                />
              </div>

              {/* 4. Password */}
              <div>
                <label
                  htmlFor="userPassword"
                  className="block text-xs font-semibold text-neutral-700 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="userPassword"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                />
              </div>

              {/* Footer Tombol Aksi */}
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
                  className="px-6 py-2 text-xs font-medium text-white bg-[#718255] hover:bg-[#607044] rounded-xl shadow-xs transition cursor-pointer"
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