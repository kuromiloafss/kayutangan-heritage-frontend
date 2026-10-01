"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PeriodModal from "../dashboard/PeriodModal";

interface TicketHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
}

export default function TicketHeader({
  searchTerm,
  onSearchChange,
  selectedPeriod,
  onPeriodChange,
}: TicketHeaderProps) {
  const [isPeriodModalOpen, setIsPeriodModalOpen] = useState<boolean>(false);

  return (
    <>
      <header className="space-y-5 mb-6">
        {/* Header Judul & Profil Admin */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2a3821] tracking-tight">
              Kelola Tiket
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Pantau semua transaksi tiket yang masuk
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-white border border-neutral-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
            <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-neutral-700">Admin</span>
          </div>
        </div>

        {/* Input Search & Tombol Pilih Periode */}
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
              placeholder="Cari kode tiket atau nama pengguna..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-neutral-200/90 rounded-2xl text-xs text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] transition shadow-xs"
            />
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={() => setIsPeriodModalOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-neutral-200/90 rounded-2xl text-xs text-neutral-600 shadow-xs hover:bg-neutral-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-2 text-neutral-500 truncate">
                <svg className="w-4 h-4 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="truncate">
                  {selectedPeriod || "Pilih Periode"}
                </span>
              </div>
              <svg className="w-4 h-4 text-neutral-400 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Modal Pilih Periode */}
      <PeriodModal
        isOpen={isPeriodModalOpen}
        onClose={() => setIsPeriodModalOpen(false)}
        onSelectPeriod={(period) => {
          onPeriodChange(period);
        }}
        selectedPeriod={selectedPeriod}
      />
    </>
  );
}