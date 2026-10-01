"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PeriodModal from "../dashboard/PeriodModal";

export default function Topbar() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Hari Ini");
  const [isPeriodModalOpen, setIsPeriodModalOpen] = useState<boolean>(false);

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Sisi Kiri: Judul & Subtitle */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-neutral-600 border border-neutral-200/60 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#2a3821] tracking-tight">
              Dashboard Admin
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5">
              Selamat datang, Admin!
            </p>
          </div>
        </div>

        {/* Sisi Kanan: Tombol Periode & Profil Admin */}
        <div className="flex items-center gap-3">
          {/* Tombol Pemilih Periode */}
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
            <span className="font-medium text-neutral-700">{selectedPeriod}</span>
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

      {/* Pop-up Periode Modal */}
      <PeriodModal
        isOpen={isPeriodModalOpen}
        onClose={() => setIsPeriodModalOpen(false)}
        onSelectPeriod={(period) => setSelectedPeriod(period)}
        selectedPeriod={selectedPeriod}
      />
    </>
  );
}