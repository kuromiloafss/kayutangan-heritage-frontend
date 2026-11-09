
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RowActions from "@/components/shared/RowActions";
import TablePagination from "@/components/ui/TablePagination";
import type { RuteItem } from "@/types/rute.types";

interface RuteTableProps {
  data: RuteItem[];
  onEdit?: (item: RuteItem) => void;
  onDelete?: (id: number) => void;
}

const ITEMS_PER_PAGE = 10;

export default function RuteTable({
  data,
  onEdit,
  onDelete,
}: RuteTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const startItem = data.length === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(
    startIndex + ITEMS_PER_PAGE,
    data.length
  );

  return (
    <article className="bg-white rounded-3xl p-4 sm:p-7 border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] relative z-10">
      {/* Tampilan Kartu (Mobile) */}
      <ul className="md:hidden divide-y divide-neutral-100">
        {paginatedData.map((item) => (
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
              label="Rute"
              variant="card"
              onEdit={() => onEdit?.(item)}
              onDelete={() => onDelete?.(item.id)}
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
              <th className="pb-4 font-semibold">Nama Rute</th>
              <th className="pb-4 font-semibold text-center">Kategori</th>
              <th className="pb-4 font-semibold text-center">Status</th>
              <th className="pb-4 font-semibold text-center w-28">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100 text-xs">
            {paginatedData.map((item, index) => (
              <motion.tr
                key={item.id}
                whileHover={{
                  backgroundColor: "rgba(250, 249, 245, 0.7)",
                }}
                className="transition-colors group"
              >
                <td className="py-4 text-center text-neutral-600 font-medium">
                  {startIndex + index + 1}
                </td>

                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden shadow-sm border border-neutral-100 bg-neutral-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <span className="font-medium text-neutral-800">
                      {item.name}
                    </span>
                  </div>
                </td>

                <td className="py-4 text-center">
                  <span className="inline-block px-3 py-1 bg-neutral-100/90 text-neutral-600 rounded-full text-[11px] font-medium border border-neutral-200/50">
                    {item.category}
                  </span>
                </td>

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

                <td className="py-4 text-center">
                  <RowActions
                    label="Rute"
                    variant="table"
                    onEdit={() => onEdit?.(item)}
                    onDelete={() => onDelete?.(item.id)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        summary={`Menampilkan ${startItem}-${endItem} dari ${data.length} detail`}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </article>
  );
}
