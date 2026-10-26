"use client";

import React, { useState } from "react";

// Kelas ditulis utuh agar terdeteksi Tailwind
const ACTIVE_SHADOW = {
  sm: "shadow-sm",
  xs: "shadow-xs",
} as const;

interface TablePaginationProps {
  summary: string;
  totalPages: number;
  /** Bayangan tombol halaman aktif; beberapa tabel lama memakai "xs" */
  activeShadow?: keyof typeof ACTIVE_SHADOW;
}

export default function TablePagination({
  summary,
  totalPages,
  activeShadow = "sm",
}: TablePaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <footer className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
      <p>{summary}</p>

      <nav aria-label="Pagination Navigasi" className="flex items-center gap-1.5 self-center sm:self-auto">
        {/* Tombol Sebelumnya */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500 transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Nomor Halaman */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition ${
              currentPage === page
                ? `bg-[#6f8054] text-white ${ACTIVE_SHADOW[activeShadow]}`
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Tombol Selanjutnya */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500 transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    </footer>
  );
}
