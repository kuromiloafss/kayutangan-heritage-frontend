"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface TransaksiItem {
  id: number;
  ticketCode: string;
  buyerName: string;
  date: string;
  category: "Warlok" | "Turis";
  paymentMethod: string;
  status: "Berhasil" | "Pending" | "Gagal";
  price: string;
}

const mockTransactions: TransaksiItem[] = [
  { id: 1, ticketCode: "KH-001245", buyerName: "Anis", date: "29 Sep 2026", category: "Warlok", paymentMethod: "QRIS", status: "Berhasil", price: "Rp 5.000" },
  { id: 2, ticketCode: "KH-001244", buyerName: "Pranoro", date: "29 Sep 2026", category: "Turis", paymentMethod: "QRIS", status: "Berhasil", price: "Rp 10.000" },
  { id: 3, ticketCode: "KH-001243", buyerName: "Solo", date: "29 Sep 2026", category: "Warlok", paymentMethod: "QRIS", status: "Berhasil", price: "Rp 5.000" },
];

export default function PendapatanTransactionTable() {
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredData = mockTransactions.filter((item) => {
    if (filterCategory === "all") return true;
    return item.category.toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <article className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] relative z-10">
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
          className="px-3.5 py-1.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-600 focus:outline-none focus:ring-1 focus:ring-[#718255] cursor-pointer"
        >
          <option value="all">Semua Transaksi</option>
          <option value="warlok">Warlok</option>
          <option value="turis">Turis</option>
        </select>
      </header>

      <div className="overflow-x-auto">
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