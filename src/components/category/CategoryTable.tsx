"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface CategoryData {
  id: number;
  name: string;
  count: number;
}

interface CategoryTableProps {
  data: CategoryData[];
  onEdit?: (item: CategoryData) => void;
  onDelete?: (id: number) => void;
}

export default function CategoryTable({
  data,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 5;

  return (
    <article className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] relative z-10">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-bold text-neutral-800 border-b border-neutral-100">
              <th className="pb-4 font-semibold w-16 text-center">No</th>
              <th className="pb-4 font-semibold">Nama Kategori</th>
              <th className="pb-4 font-semibold text-center w-40">Jumlah Tempat</th>
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
                <td className="py-4 text-center text-neutral-600 font-medium">
                  {index + 1}
                </td>

                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <span className="font-medium text-neutral-800">
                      {item.name}
                    </span>
                  </div>
                </td>

                <td className="py-4 text-center">
                  <span className="inline-block px-4 py-1.5 bg-[#f6f7f8] border border-neutral-200/70 text-neutral-700 rounded-xl text-xs font-semibold min-w-12">
                    {item.count}
                  </span>
                </td>

                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit && onEdit(item)}
                      title="Edit Kategori"
                      className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#6f8054]/20 hover:text-[#495734] text-neutral-500 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete && onDelete(item.id)}
                      title="Hapus Kategori"
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

      <footer className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
        <p>Menampilkan 1-5 dari 28 detail</p>

        <nav aria-label="Pagination Navigasi" className="flex items-center gap-1.5 self-center sm:self-auto">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

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