"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, growth, icon }: StatCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] flex flex-col justify-between cursor-default"
    >
      <header className="flex items-center gap-2.5 mb-3">
        <span className="p-2 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center">
          {icon}
        </span>
        <h3 className="text-xs font-medium text-neutral-500">{title}</h3>
      </header>

      <div>
        <p className="text-xl font-bold text-neutral-800 tracking-tight">{value}</p>
        <footer className="flex items-center gap-1 mt-2 text-[11px] text-neutral-400">
          <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span>{growth}</span>
        </footer>
      </div>
    </motion.article>
  );
}