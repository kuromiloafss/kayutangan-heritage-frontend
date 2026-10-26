import React from "react";

export default function IncomeChartCard() {
  return (
    <article className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
      <header className="mb-4">
        <h2 className="text-sm font-bold text-neutral-800">Laporan Pendapatan</h2>
        <p className="text-[11px] text-neutral-400">
          Perbandingan pendapatan perminggu dalam periode yang dipilih.
        </p>
      </header>
      <div className="h-44 w-full flex items-center justify-center bg-neutral-50/60 rounded-xl border border-dashed border-neutral-200">
        <span className="text-xs text-neutral-400 font-medium">Area Grafik Garis Pendapatan</span>
      </div>
    </article>
  );
}