"use client";

import React from "react";
import { motion } from "framer-motion";
import { mockActivities } from "../data/activities.mock";

export default function RecentActivitiesTable() {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]"
    >
      <header className="mb-4">
        <h2 className="text-sm font-bold text-neutral-800">Aktivitas Terbaru</h2>
      </header>

      {/* Tampilan Daftar (Mobile) */}
      <ul className="sm:hidden divide-y divide-neutral-100 text-xs">
        {mockActivities.map((item, index) => (
          <li key={index} className="py-2.5 first:pt-0 last:pb-0">
            <p className="text-neutral-700">
              {item.action} <span className="font-semibold">{item.user}</span>
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">{item.time}</p>
          </li>
        ))}
      </ul>

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-neutral-400 border-b border-neutral-100">
              <th className="pb-2 font-medium">Waktu</th>
              <th className="pb-2 font-medium">Aktivitas</th>
              <th className="pb-2 font-medium">Pengguna</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-neutral-700">
            {mockActivities.map((item, index) => (
              <motion.tr
                key={index}
                whileHover={{ backgroundColor: "rgba(244, 245, 246, 0.6)" }}
                className="transition-colors"
              >
                <td className="py-2.5 text-neutral-400">{item.time}</td>
                <td className="py-2.5">{item.action}</td>
                <td className="py-2.5 font-medium">{item.user}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.article>
  );
}