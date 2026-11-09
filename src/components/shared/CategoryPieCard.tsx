
"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Warlok",
    value: 75,
    pendapatan: 470000,
    tiket: 304,
    color: "#756CE8",
  },
  {
    name: "Turis",
    value: 25,
    pendapatan: 120000,
    tiket: 101,
    color: "#55C1AD",
  },
];

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CategoryPieCard() {
  return (
    <article className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <header className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-[#34402c]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2m-16 0a2 2 0 000 8m0-8h16m0 8a2 2 0 000-8m0 8v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2m0 0h16M9 12h.01M15 12h.01"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#34402c]">
            Penjualan Tiket Berdasarkan Kategori
          </h2>
          <p className="text-[11px] text-neutral-400 mt-1">
            Perbandingan jumlah tiket warlok dan turis.
          </p>
        </div>
      </header>

      {/* Chart dan Informasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-5">
        {/* Pie Chart dan Legend */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={0}
                  paddingAngle={0}
                  stroke="none"
                >
                  {data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [`${value}%`, "Persentase"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Keterangan di bawah diagram */}
          <div className="flex items-center justify-center gap-3 -mt-1">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-neutral-500">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Kategori */}
        <div className="flex flex-col gap-3">
          {data.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px] font-medium text-[#34402c]">
                    {item.name}
                  </span>
                </div>

                <span className="text-[9px] text-neutral-600 whitespace-nowrap">
                  {formatRupiah(item.pendapatan)}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 pl-6">
                <span className="text-[10px] text-neutral-600">
                  {item.tiket} tiket
                </span>

                <span className="text-[10px] text-neutral-500">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
