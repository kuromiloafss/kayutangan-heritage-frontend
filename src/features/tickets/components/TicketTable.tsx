"use client";

import React from "react";
import { motion } from "framer-motion";
import RowActions from "@/components/shared/RowActions";
import TablePagination from "@/components/ui/TablePagination";
import type { TicketItem } from "@/types/tickets.types";

interface TicketTableProps {
  data: TicketItem[];
  onEdit?: (item: TicketItem) => void;
  onDelete?: (id: number) => void;
}

export default function TicketTable({
  data,
  onEdit,
  onDelete,
}: TicketTableProps) {
  return (
    <article className="bg-white rounded-3xl p-4 sm:p-7 border border-neutral-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] relative z-10">
      {/* Tampilan Kartu (Mobile) */}
      <ul className="md:hidden divide-y divide-neutral-100">
        {data.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-neutral-800 truncate">
                  {item.ticketCode}
                </p>
                <span
                  className={`inline-block shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                    item.status === "Berhasil"
                      ? "bg-[#6f8054] text-white"
                      : item.status === "Pending"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-neutral-700 mt-1 truncate">{item.userName}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">{item.dateTime}</p>
            </div>
            <RowActions
              label="Tiket"
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
              <th className="pb-4 font-semibold">Kode Tiket</th>
              <th className="pb-4 font-semibold">Nama Pengguna</th>
              <th className="pb-4 font-semibold">Tanggal & Waktu</th>
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

                {/* Kolom Kode Tiket */}
                <td className="py-4 font-medium text-neutral-700">
                  {item.ticketCode}
                </td>

                {/* Kolom Nama Pengguna */}
                <td className="py-4 font-medium text-neutral-800">
                  {item.userName}
                </td>

                {/* Kolom Tanggal & Waktu */}
                <td className="py-4 text-neutral-500">
                  {item.dateTime}
                </td>

                {/* Kolom Status */}
                <td className="py-4 text-center">
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-[11px] font-medium ${
                      item.status === "Berhasil"
                        ? "bg-[#6f8054] text-white"
                        : item.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Kolom Aksi */}
                <td className="py-4 text-center">
                  <RowActions
                    label="Tiket"
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
      <TablePagination summary="Menampilkan 1-5 dari 28 detail" totalPages={5} activeShadow="xs" />
    </article>
  );
}