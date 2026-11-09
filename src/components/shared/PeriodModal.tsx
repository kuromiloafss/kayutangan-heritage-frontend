
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PeriodSelection {
  type: "today" | "week" | "month" | "custom";
  label: string;
  startDate: string;
  endDate: string;
}

interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPeriod: (period: PeriodSelection) => void;
  selectedPeriod?: string;
}

type PeriodType = "today" | "week" | "month" | "custom";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const displayDate = (date: Date) =>
  date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function PeriodModal({
  isOpen,
  onClose,
  onSelectPeriod,
  selectedPeriod = "Hari Ini",
}: PeriodModalProps) {
  const today = new Date();

  const [selectedType, setSelectedType] = useState<PeriodType>("today");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const todayDate = formatDate(today);

  const weekStart = new Date(today);
  const day = today.getDay();
  const difference = day === 0 ? 6 : day - 1;
  weekStart.setDate(today.getDate() - difference);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const handleSave = () => {
    let start = new Date(today);
    let end = new Date(today);
    let label = "Hari Ini";

    if (selectedType === "week") {
      start = weekStart;
      end = weekEnd;
      label = "Minggu Ini";
    }

    if (selectedType === "month") {
      start = monthStart;
      end = monthEnd;
      label = "Bulan Ini";
    }

    if (selectedType === "custom") {
      if (!startDate || !endDate) {
        setError("Silakan pilih tanggal mulai dan tanggal akhir.");
        return;
      }

      if (startDate > endDate) {
        setError("Tanggal mulai tidak boleh melebihi tanggal akhir.");
        return;
      }

      start = new Date(`${startDate}T00:00:00`);
      end = new Date(`${endDate}T00:00:00`);
      label = `${displayDate(start)} - ${displayDate(end)}`;
    }

    onSelectPeriod({
      type: selectedType,
      label,
      startDate: formatDate(start),
      endDate: formatDate(end),
    });

    setError("");
    onClose();
  };

  const options = [
    {
      type: "today" as const,
      title: "Hari Ini",
      date: displayDate(today),
    },
    {
      type: "week" as const,
      title: "Minggu Ini",
      date: `${displayDate(weekStart)} - ${displayDate(weekEnd)}`,
    },
    {
      type: "month" as const,
      title: "Bulan Ini",
      date: `${displayDate(monthStart)} - ${displayDate(monthEnd)}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          <motion.article
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-7 shadow-2xl z-10 text-neutral-800 max-h-[92dvh] overflow-y-auto overscroll-contain"
          >
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

            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => {
                    setSelectedType(option.type);
                    setError("");
                  }}
                  className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all ${
                    selectedType === option.type
                      ? "border-[#718255] bg-white ring-1 ring-[#718255]"
                      : "border-neutral-200/80 bg-[#f9faf7]/50 hover:bg-[#f9faf7]"
                  }`}
                >
                  <div className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center shrink-0">
                    {selectedType === option.type && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3d4b30]" />
                    )}
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-neutral-800">
                      {option.title}
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      {option.date}
                    </p>
                  </div>
                </button>
              ))}

              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  selectedType === "custom"
                    ? "border-[#718255] bg-white ring-1 ring-[#718255]"
                    : "border-neutral-200/80 bg-[#f9faf7]/50 hover:bg-[#f9faf7]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType("custom");
                    setError("");
                  }}
                  className="w-full flex items-center gap-3.5 text-left"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-neutral-300 flex items-center justify-center shrink-0">
                    {selectedType === "custom" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3d4b30]" />
                    )}
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-500 shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-neutral-800">
                      Custom
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Pilih tanggal mulai dan akhir
                    </p>
                  </div>
                </button>

                {selectedType === "custom" && (
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-1 font-medium">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        max={endDate || undefined}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setError("");
                        }}
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
                        min={startDate || undefined}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setError("");
                        }}
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#718255]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}
            </div>

            <footer className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2.5 pt-5 mt-4 border-t border-neutral-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="px-6 py-3 sm:py-2 text-sm sm:text-xs font-medium text-neutral-600 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition cursor-pointer"
              >
                Batal
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSave}
                className="px-6 py-3 sm:py-2 text-sm sm:text-xs font-medium text-white bg-[#718255] hover:bg-[#607044] rounded-xl shadow-xs transition cursor-pointer"
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
