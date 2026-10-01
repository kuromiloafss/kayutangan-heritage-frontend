"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PeriodModal from "../dashboard/PeriodModal";

interface PendapatanHeaderProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export default function PendapatanHeader({
  selectedPeriod,
  onPeriodChange,
}: PendapatanHeaderProps) {
  const [isPeriodModalOpen, setIsPeriodModalOpen] = useState<boolean>(false);

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-neutral-600 border border-neutral-200/60 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#2a3821] tracking-tight">
              Laporan Pendapatan
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Pantau pendapatan dari penjualan tiket wisata Kayutangan.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Tombol Pilih Periode */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setIsPeriodModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-neutral-200/90 rounded-2xl text-xs text-neutral-600 shadow-xs hover:bg-neutral-50 transition cursor-pointer"
          >
            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-neutral-700">{selectedPeriod || "Pilih Periode"}</span>
            <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>

          {/* Profil Admin */}
          <div className="flex items-center gap-2 bg-white border border-neutral-200/80 px-3 py-1.5 rounded-full shadow-xs">
            <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-neutral-700">Admin</span>
          </div>
        </div>
      </header>

      <PeriodModal
        isOpen={isPeriodModalOpen}
        onClose={() => setIsPeriodModalOpen(false)}
        onSelectPeriod={(period) => onPeriodChange(period)}
        selectedPeriod={selectedPeriod}
      />
    </>
  );
}