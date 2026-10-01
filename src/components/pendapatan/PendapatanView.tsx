"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import PendapatanHeader from "./PendapatanHeader";
import PendapatanStats from "./PendapatanStats";
import IncomeChartCard from "../dashboard/IncomeChartCard";
import CategoryPieCard from "../dashboard/CategoryPieCard";
import PendapatanTransactionTable from "./PendapatanTransactionTable";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function PendapatanView() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Hari Ini");

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <PendapatanHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <PendapatanStats />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <IncomeChartCard />
        </div>
        <div className="lg:col-span-5">
          <CategoryPieCard />
        </div>
      </div>

      <PendapatanTransactionTable />
    </motion.section>
  );
}