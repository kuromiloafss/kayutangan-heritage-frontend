"use client";

import React from "react";
import { motion } from "framer-motion";

interface PenggunaHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export default function PenggunaHeader({
  searchTerm,
  onSearchChange,
  onAddClick,
}: PenggunaHeaderProps) {
  return (
    <header className="space-y-5 mb-6">
      {/* Baris Atas: Judul & Profil Admin */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-neutral-600 border border-neutral-200/60 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#2a3821] tracking-tight">
              Kelola Pengguna
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Kelola akun pengguna aplikasi.
            </p>
          </div>
        </div>

        {/* Profil Admin */}
        <div className="flex items-center gap-2 bg-white border border-neutral-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
          <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-neutral-700">Admin</span>
        </div>
      </div>

      {/* Baris Bawah: Input Cari & Tombol Tambah Pengguna */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        <div className="relative flex-1 flex items-center">
          <span className="absolute left-4 text-neutral-400 pointer-events-none">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama atau email"
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-neutral-200/90 rounded-2xl text-xs text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] transition shadow-xs"
          />
        </div>

        {/* Tombol Tambah Pengguna */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 bg-[#2b3a24] hover:bg-[#212d1b] text-white px-5 py-2.5 rounded-2xl text-xs font-medium shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah Pengguna</span>
        </motion.button>
      </div>
    </header>
  );
}