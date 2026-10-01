"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPeriod: (period: string) => void;
  selectedPeriod?: string;
}

type PeriodType = "today" | "week" | "month" | "custom";

export default function PeriodModal({
  isOpen,
  onClose,
  onSelectPeriod,
  selectedPeriod = "",
}: PeriodModalProps) {
  const [selectedType, setSelectedType] = useState<PeriodType>("today");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSave = () => {
    let result = "Hari Ini";
    if (selectedType === "today") result = "Hari Ini";
    else if (selectedType === "week") result = "Minggu Ini";
    else if (selectedType === "month") result = "Bulan Ini";
    else if (selectedType === "custom") {
      result = startDate && endDate ? `${startDate} - ${endDate}` : "Custom";
    }

    onSelectPeriod(result);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Modal Card */}
          <motion.article
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10 text-neutral-800 my-8"
          >
            {/* Header */}
            <header className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-[#2a3821] tracking-tight">
                  Pilih Periode
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Tentukan rentang waktu.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup modal"
                className="text-neutral-400 hover:text-neutral-600 transition p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {/* List Pilihan Radio */}
            <div className="space-y-3">
              {/* Opsi 1: Hari Ini */}
              <div
                onClick={() => setSelectedType("today")}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedType === "today"
                    ? "border-[#718255] bg-white ring-1 ring-[#718255]"
                    : "border-neutral-200/80 bg-[#f9faf7]/50 hover:bg-[#f9faf7]"
                }`}
              >
                <div className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center shrink-0">
                  {selectedType === "today" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3d4b30]" />
                  )}
                </div>
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-500 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-800">Hari Ini</h3>
                  <p className="text-[11px] text-neutral-400">29 Sep 2026</p>
                </div>
              </div>

              {/* Opsi 2: Minggu Ini */}
              <div
                onClick={() => setSelectedType("week")}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedType === "week"
                    ? "border-[#718255] bg-white ring-1 ring-[#718255]"
                    : "border-neutral-200/80 bg-[#f9faf7]/50 hover:bg-[#f9faf7]"
                }`}
              >
                <div className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center shrink-0">
                  {selectedType === "week" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3d4b30]" />
                  )}
                </div>
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-500 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-800">Minggu Ini</h3>
                  <p className="text-[11px] text-neutral-400">29 Sep 2026 - 6 Okt 2026</p>
                </div>
              </div>

              {/* Opsi 3: Bulan Ini */}
              <div
                onClick={() => setSelectedType("month")}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedType === "month"
                    ? "border-[#718255] bg-white ring-1 ring-[#718255]"
                    : "border-neutral-200/80 bg-[#f9faf7]/50 hover:bg-[#f9faf7]"
                }`}
              >
                <div className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center shrink-0">
                  {selectedType === "month" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3d4b30]" />
                  )}
                </div>
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-500 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-800">Bulan Ini</h3>
                  <p className="text-[11px] text-neutral-400">1 Sep 2026 - 1 Okt 2026</p>
                </div>
              </div>

              {/* Opsi 4: Custom */}
              <div
                onClick={() => setSelectedType("custom")}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedType === "custom"
                    ? "border-[#718255] bg-white ring-1 ring-[#718255]"
                    : "border-neutral-200/80 bg-[#f9faf7]/50 hover:bg-[#f9faf7]"
                }`}
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center shrink-0">
                    {selectedType === "custom" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3d4b30]" />
                    )}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-800">Custom</h3>
                    <p className="text-[11px] text-neutral-400">Pilih tanggal mulai dan akhir</p>
                  </div>
                </div>

                {/* Input Tanggal Mulai & Akhir */}
                {selectedType === "custom" && (
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1 font-medium">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#718255]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1 font-medium">
                        Tanggal Akhir
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#718255]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <footer className="flex items-center justify-end gap-2.5 pt-5 mt-4 border-t border-neutral-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-xs font-medium text-neutral-600 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition cursor-pointer"
              >
                Batal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSave}
                className="px-6 py-2 text-xs font-medium text-white bg-[#718255] hover:bg-[#607044] rounded-xl shadow-xs transition cursor-pointer"
              >
                Simpan
              </motion.button>
            </footer>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}