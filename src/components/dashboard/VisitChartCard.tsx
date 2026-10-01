import React from "react";

export default function VisitChartCard() {
  return (
    <article className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
      <header className="mb-4">
        <h2 className="text-sm font-bold text-neutral-800">Grafik Kunjungan</h2>
        <p className="text-[11px] text-neutral-400">Total kunjungan wisatawan dalam periode yang dipilih.</p>
      </header>
      <div className="h-44 w-full flex items-center justify-center bg-neutral-50/60 rounded-xl border border-dashed border-neutral-200">
        <span className="text-xs text-neutral-400 font-medium">Area Grafik Kunjungan</span>
      </div>
    </article>
  );
}