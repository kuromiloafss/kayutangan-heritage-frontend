
"use client";

import React, { useState } from "react";

const ACTIVE_SHADOW = {
  sm: "shadow-sm",
  xs: "shadow-xs",
} as const;

interface TablePaginationProps {
  summary: string;
  totalPages: number;
  activeShadow?: keyof typeof ACTIVE_SHADOW;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function TablePagination({
  summary,
  totalPages,
  activeShadow = "sm",
  currentPage: controlledPage,
  onPageChange,
}: TablePaginationProps) {
  const [internalPage, setInternalPage] = useState(1);

  // Minimal ada 1 halaman
  const safeTotalPages = Math.max(1, totalPages);

  // Menggunakan halaman dari parent jika tersedia
  const currentPage = Math.min(
    Math.max(1, controlledPage ?? internalPage),
    safeTotalPages
  );

  const changePage = (page: number) => {
    const nextPage = Math.max(1, Math.min(page, safeTotalPages));

    if (onPageChange) {
      onPageChange(nextPage);
    } else {
      setInternalPage(nextPage);
    }
  };

  const pages = Array.from(
    { length: safeTotalPages },
    (_, index) => index + 1
  );

  return (
    <footer className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100 text-xs text-neutral-500">
      <p>{summary}</p>

      <nav
        aria-label="Pagination Navigasi"
        className="flex items-center gap-1.5 self-center sm:self-auto"
      >
        {/* Tombol halaman sebelumnya */}
        <button
          type="button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Halaman sebelumnya"
          className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-500 transition"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Nomor halaman */}
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => changePage(page)}
            aria-label={`Halaman ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition ${
              currentPage === page
                ? `bg-[#6f8054] text-white ${ACTIVE_SHADOW[activeShadow]}`
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Tombol halaman berikutnya */}
        <button
          type="button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === safeTotalPages}
          aria-label="Halaman berikutnya"
          className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-lg hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-500 transition"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </footer>
  );
}
