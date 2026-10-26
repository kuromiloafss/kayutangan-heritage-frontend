"use client";

import React from "react";
import { motion } from "framer-motion";
import RowActions from "@/components/shared/RowActions";
import TablePagination from "@/components/ui/TablePagination";
import type { CategoryData } from "@/types/category.types";

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
  return (
    <article className="bg-white rounded-3xl p-4 sm:p-7 border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] relative z-10">
      {/* Tampilan Kartu (Mobile) */}
      <ul className="md:hidden divide-y divide-neutral-100">
        {data.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className="w-10 h-10 rounded-xl bg-[#f6f7f8] border border-neutral-200/70 flex items-center justify-center text-neutral-500 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-800 truncate">
                {item.name}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5">
                {item.count} tempat
              </p>
            </div>
            <RowActions
              label="Kategori"
              variant="card"
              onEdit={() => onEdit && onEdit(item)}
              onDelete={() => onDelete && onDelete(item.id)}
            />
          </li>
        ))}
      </ul>

      {/* Tampilan Tabel (Tablet & Desktop) */}
      <div className="hidden md:block overflow-x-auto">
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
                  <RowActions
                    label="Kategori"
                    variant="table"
                    onEdit={() => onEdit && onEdit(item)}
                    onDelete={() => onDelete && onDelete(item.id)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination summary="Menampilkan 1-5 dari 28 detail" totalPages={5} />
    </article>
  );
}