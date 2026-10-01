"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Gelap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          {/* Kartu Dialog Modal */}
          <motion.article
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-desc"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-center select-none"
          >
            {/* Tombol Tutup (Silang) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup dialog konfirmasi"
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-600 transition p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Lingkaran Ikon Avatar dengan Animasi Masuk & Floating Ring */}
            <div className="flex justify-center mb-6 mt-2">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 350, damping: 20 }}
                  className="w-20 h-20 rounded-full bg-[#d9d9d9] flex items-center justify-center text-neutral-500 shadow-inner"
                >
                  <svg className="w-9 h-9 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </motion.div>
                
                {/* Efek Ping Ring Animasi Halus */}
                <motion.div
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.35 }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-neutral-300 pointer-events-none"
                />
              </div>
            </div>

            {/* Teks Judul & Deskripsi */}
            <h2
              id="logout-dialog-title"
              className="text-xl font-bold text-[#2a3821] tracking-tight"
            >
              Konfirmasi Logout
            </h2>
            <p
              id="logout-dialog-desc"
              className="text-xs text-neutral-500 mt-2 leading-relaxed px-2 font-normal"
            >
              Apakah kamu yakin ingin keluar dari akun admin?
            </p>

            {/* Tombol Aksi Batal & Logout */}
            <footer className="grid grid-cols-2 gap-3 mt-7">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition cursor-pointer"
              >
                Batal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onConfirm}
                className="py-2.5 px-4 text-xs font-semibold text-white bg-[#718255] hover:bg-[#5f6f45] rounded-xl shadow-xs transition cursor-pointer"
              >
                Logout
              </motion.button>
            </footer>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}