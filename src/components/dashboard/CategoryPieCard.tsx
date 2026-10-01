import React from "react";

export default function CategoryPieCard() {
  return (
    <article className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
      <header className="mb-4">
        <h2 className="text-sm font-bold text-neutral-800">Penjualan Tiket Berdasarkan Kategori</h2>
        <p className="text-[11px] text-neutral-400">Perbandingan jumlah warlok dan turis.</p>
      </header>

      <div className="h-44 w-full flex items-center justify-around bg-neutral-50/60 rounded-xl border border-dashed border-neutral-200 px-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6573dd] to-[#60c4a4] shrink-0" />
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34402c]" />
            <span className="text-neutral-600">Warlok: Rp 470.000 (75%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6f8054]" />
            <span className="text-neutral-600">Turis: Rp 120.000 (25%)</span>
          </div>
        </div>
      </div>
    </article>
  );
}