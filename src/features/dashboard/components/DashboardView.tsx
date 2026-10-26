"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import StatCard from "@/components/shared/StatCard";
import IncomeChartCard from "@/components/shared/IncomeChartCard";
import CategoryPieCard from "@/components/shared/CategoryPieCard";
import DashboardHeader from "./DashboardHeader";
import VisitChartCard from "./VisitChartCard";
import RecentActivitiesTable from "./RecentActivitiesTable";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function DashboardView() {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <DashboardHeader />

      {/* 5 Kartu Statistik Ringkasan */}
      <motion.section
        variants={itemVariants}
        aria-label="Statistik Utama"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 [&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1"
      >
        <StatCard
          title="Tiket Turis"
          value="Rp 3.000.000"
          growth="5% dari bulan lalu"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Tempat Wisata"
          value="342"
          growth="5% dari bulan lalu"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Pengguna"
          value="1.245"
          growth="5% dari bulan lalu"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Tiket Terjual"
          value="342"
          growth="15% dari bulan lalu"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          }
        />
        <StatCard
          title="Total Rute"
          value="12"
          growth="5% dari bulan lalu"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          }
        />
      </motion.section>

      {/* Baris 1: Pendapatan & Kategori */}
      <motion.section
        variants={itemVariants}
        aria-label="Grafik Pendapatan & Kategori"
        className="grid grid-cols-1 lg:grid-cols-12 gap-5"
      >
        <div className="lg:col-span-7">
          <IncomeChartCard />
        </div>
        <div className="lg:col-span-5">
          <CategoryPieCard />
        </div>
      </motion.section>

      {/* Baris 2: Kunjungan & Tabel Aktivitas */}
      <motion.section
        variants={itemVariants}
        aria-label="Aktivitas & Kunjungan"
        className="grid grid-cols-1 lg:grid-cols-12 gap-5"
      >
        <div className="lg:col-span-6">
          <VisitChartCard />
        </div>
        <div className="lg:col-span-6">
          <RecentActivitiesTable />
        </div>
      </motion.section>
    </motion.main>
  );
}
