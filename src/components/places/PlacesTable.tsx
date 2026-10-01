"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface PlaceItem {
  id: number;
  image: string;
  name: string;
  category: string;
  status: "Aktif" | "Nonaktif";
}

interface PlacesTableProps {
  data: PlaceItem[];
  onEdit?: (place: PlaceItem) => void;
  onDelete?: (id: number) => void;
}

export default function PlacesTable({ data, onEdit, onDelete }: PlacesTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 5;

  return (
    <article className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] relative z-10">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-bold text-neutral-800 border-b border-neutral-100">
              <th className="pb-4 font-semibold w-12 text-center">No</th>
              <th className="pb-4 font-semibold w-28">Gambar</th>
              <th className="pb-4 font-semibold">Nama Tempat</th>
              <th className="pb-4 font-semibold text-center">Kategori</th>
              <th className="pb-4 font-semibold text-center">Status</th>
              <th className="pb-4 font-semibold text-center w-28">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {data.map((item, index) => (
              <motion.tr
                key={item.id}
                whileHover={{ backgroundColor: "rgba(250, 249, 245, 0.7)" }}
                className="transition-colors group"
              >
                {/* Kolom No */}
                <td className="py-4 text-center text-neutral-600 font-medium">
                  {index + 1}
                </td>

                {/* Kolom Gambar Thumbnail */}
                <td className="py-4">
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden shadow-sm border border-neutral-100 bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>

                {/* Kolom Nama Tempat */}
                <td className="py-4 font-medium text-neutral-800">
                  {item.name}
                </td>

                {/* Kolom Kategori Badge */}
                <td className="py-4 text-center">
                  <span className="inline-block px-3 py-1 bg-neutral-100/90 text-neutral-600 rounded-full text-[11px] font-medium border border-neutral-200/50">
                    {item.category}
                  </span>
                </td>

                {/* Kolom Status Badge */}
                <td className="py-4 text-center">
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-[11px] font-medium ${
                      item.status === "Aktif"
                        ? "bg-[#6f8054] text-white"
                        : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Kolom Aksi (Edit & Hapus) */}
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* Tombol Edit */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit && onEdit(item)}
                      title="Edit Tempat"
                      className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#6f8054]/20 hover:text-[#495734] text-neutral-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </motion.button>

                    {/* Tombol Delete */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete && onDelete(item.id)}
                      title="Hapus Tempat"
                      className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bagian Bawah: Informasi Data & Pagination Semantik */}
      <footer className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
        <p>Menampilkan 1-5 dari 28 detail</p>

        <nav aria-label="Pagination Navigasi" className="flex items-center gap-1.5 self-center sm:self-auto">
          {/* Tombol Sebelumnya */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Nomor Halaman */}
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition ${
                currentPage === page
                  ? "bg-[#6f8054] text-white shadow-sm"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Tombol Selanjutnya */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </footer>
    </article>
  );
}