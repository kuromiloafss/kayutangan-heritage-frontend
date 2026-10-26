"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import IncomeChartCard from "@/components/shared/IncomeChartCard";
import CategoryPieCard from "@/components/shared/CategoryPieCard";
import { pageEnterVariants } from "@/lib/animations";
import PendapatanHeader from "./PendapatanHeader";
import PendapatanStats from "./PendapatanStats";
import PendapatanTransactionTable from "./PendapatanTransactionTable";

export default function PendapatanView() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Hari Ini");

  return (
    <motion.section
      variants={pageEnterVariants}
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