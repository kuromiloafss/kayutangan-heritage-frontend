
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RowActions from "@/components/shared/RowActions";
import TablePagination from "@/components/ui/TablePagination";
import type { PlaceItem } from "@/types/places.types";

interface PlacesTableProps {
  data: PlaceItem[];
  onEdit?: (place: PlaceItem) => void;
  onDelete?: (id: number) => void;
}

const ITEMS_PER_PAGE = 10;

export default function PlacesTable({
  data,
  onEdit,
  onDelete,
}: PlacesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / ITEMS_PER_PAGE)
  );

  // Kembali ke halaman yang tersedia jika data berkurang
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Mengambil maksimal 10 data sesuai halaman
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(
    startIndex + ITEMS_PER_PAGE,
    data.length
  );

  const currentData = data.slice(startIndex, endIndex);

  const summary =
    data.length === 0
      ? "Menampilkan 0 dari 0 detail"
      : `Menampilkan ${startIndex + 1}-${endIndex} dari ${data.length} detail`;

  return (
    <article className="bg-white rounded-3xl p-4 sm:p-7 border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] relative z-10">

      {/* Tampilan Kartu (Mobile) */}
      <ul className="md:hidden divide-y divide-neutral-100">
        {currentData.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="relative w-16 h-14 rounded-xl overflow-hidden shadow-sm border border-neutral-100 bg-neutral-100 shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-800 truncate">
                {item.name}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className="inline-block px-2.5 py-0.5 bg-neutral-100/90 text-neutral-600 rounded-full text-[11px] font-medium border border-neutral-200/50">
                  {item.category}
                </span>

                <span
                  className={`inline-block shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                    item.status === "Aktif"
                      ? "bg-[#6f8054] text-white"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <RowActions
              label="Tempat"
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
              <th className="pb-4 font-semibold w-12 text-center">No</th>
              <th className="pb-4 font-semibold w-28">Gambar</th>
              <th className="pb-4 font-semibold">Nama Tempat</th>
              <th className="pb-4 font-semibold text-center">Kategori</th>
              <th className="pb-4 font-semibold text-center">Status</th>
              <th className="pb-4 font-semibold text-center w-28">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100 text-xs">
            {currentData.map((item, index) => (
              <motion.tr
                key={item.id}
                whileHover={{
                  backgroundColor: "rgba(250, 249, 245, 0.7)",
                }}
                className="transition-colors group"
              >
                {/* Nomor urut */}
                <td className="py-4 text-center text-neutral-600 font-medium">
                  {startIndex + index + 1}
                </td>

                {/* Gambar */}
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

                {/* Nama tempat */}
                <td className="py-4 font-medium text-neutral-800">
                  {item.name}
                </td>

                {/* Kategori */}
                <td className="py-4 text-center">
                  <span className="inline-block px-3 py-1 bg-neutral-100/90 text-neutral-600 rounded-full text-[11px] font-medium border border-neutral-200/50">
                    {item.category}
                  </span>
                </td>

                {/* Status */}
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

                {/* Aksi */}
                <td className="py-4 text-center">
                  <RowActions
                    label="Tempat"
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

      {/* Pagination */}
      <TablePagination
        summary={summary}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </article>
  );
}
