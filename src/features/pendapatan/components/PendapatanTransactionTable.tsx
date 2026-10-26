"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { mockTransactions } from "../data/transactions.mock";

export default function PendapatanTransactionTable() {
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredData = mockTransactions.filter((item) => {
    if (filterCategory === "all") return true;
    return item.category.toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <article className="bg-white rounded-3xl p-4 sm:p-7 border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] relative z-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-sm font-bold text-neutral-800">
            Transaksi Terbaru
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Daftar transaksi tiket yang baru saja dilakukan.
          </p>
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full sm:w-auto px-3.5 py-2.5 sm:py-1.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#718255] cursor-pointer"
        >
          <option value="all">Semua Transaksi</option>
          <option value="warlok">Warlok</option>
          <option value="turis">Turis</option>
        </select>
      </header>

      {/* Tampilan Kartu (Mobile) */}
      <ul className="md:hidden divide-y divide-neutral-100">
        {filteredData.map((item) => (
          <li key={item.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-800 truncate">
                  {item.buyerName}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {item.ticketCode} · {item.date}
                </p>
              </div>
              <p className="text-sm font-semibold text-neutral-800 shrink-0">
                {item.price}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="inline-block px-2.5 py-0.5 bg-neutral-100/90 text-neutral-600 rounded-full text-[11px] font-medium border border-neutral-200/50">
                {item.category}
              </span>
              <span className="inline-block px-2.5 py-0.5 bg-neutral-100/90 text-neutral-600 rounded-full text-[11px] font-medium border border-neutral-200/50">
                {item.paymentMethod}
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#6f8054] text-white">
                {item.status}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Tampilan Tabel (Tablet & Desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#2b3a24] text-white text-xs font-semibold rounded-xl">
              <th className="py-3 px-3 rounded-l-xl text-center w-12">No</th>
              <th className="py-3 px-3">Kode Tiket</th>
              <th className="py-3 px-3">Nama Pembeli</th>
              <th className="py-3 px-3">Tanggal</th>
              <th className="py-3 px-3">Kategori</th>
              <th className="py-3 px-3">Metode Pembayaran</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 rounded-r-xl text-right">Harga</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {filteredData.map((item, index) => (
              <motion.tr
                key={item.id}
                whileHover={{ backgroundColor: "rgba(250, 249, 245, 0.7)" }}
                className="transition-colors group"
              >
                <td className="py-4 px-3 text-center text-neutral-600 font-medium">
                  {index + 1}
                </td>
                <td className="py-4 px-3 font-medium text-neutral-700">
                  {item.ticketCode}
                </td>
                <td className="py-4 px-3 font-medium text-neutral-800">
                  {item.buyerName}
                </td>
                <td className="py-4 px-3 text-neutral-500">
                  {item.date}
                </td>
                <td className="py-4 px-3 text-neutral-600">
                  {item.category}
                </td>
                <td className="py-4 px-3 text-neutral-600">
                  {item.paymentMethod}
                </td>
                <td className="py-4 px-3 text-center">
                  <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-medium bg-[#6f8054] text-white">
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-3 font-semibold text-right text-neutral-800">
                  {item.price}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}