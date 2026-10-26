"use client";

import React from "react";
import { motion } from "framer-motion";

interface RowActionsProps {
  /** Nama entitas untuk tooltip, mis. "Tempat" -> "Edit Tempat" / "Hapus Tempat" */
  label: string;
  onEdit: () => void;
  onDelete: () => void;
  /** "table" untuk kolom Aksi di tabel desktop, "card" untuk daftar kartu mobile */
  variant: "table" | "card";
}

export default function RowActions({ label, onEdit, onDelete, variant }: RowActionsProps) {
  if (variant === "card") {
    return (
      <div className="flex items-center gap-1.5 shrink-0">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onEdit}
          title={`Edit ${label}`}
          aria-label={`Edit ${label}`}
          className="w-9 h-9 rounded-lg bg-neutral-100 active:bg-[#6f8054]/20 text-neutral-500 flex items-center justify-center transition-colors cursor-pointer"
        >
          <EditIcon className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          title={`Hapus ${label}`}
          aria-label={`Hapus ${label}`}
          className="w-9 h-9 rounded-lg bg-red-50 active:bg-red-100 text-red-500 flex items-center justify-center transition-colors cursor-pointer"
        >
          <DeleteIcon className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onEdit}
        title={`Edit ${label}`}
        className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-neutral-100 hover:bg-[#6f8054]/20 hover:text-[#495734] text-neutral-500 flex items-center justify-center transition-colors cursor-pointer"
      >
        <EditIcon className="w-3.5 h-3.5" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDelete}
        title={`Hapus ${label}`}
        className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors cursor-pointer"
      >
        <DeleteIcon className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}

function EditIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

function DeleteIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}
