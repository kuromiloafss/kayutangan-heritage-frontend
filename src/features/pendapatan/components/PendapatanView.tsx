
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import IncomeChartCard from "@/components/shared/IncomeChartCard";
import CategoryPieCard from "@/components/shared/CategoryPieCard";
import { pageEnterVariants } from "@/lib/animations";
import PendapatanHeader from "./PendapatanHeader";
import PendapatanStats from "./PendapatanStats";
import PendapatanTransactionTable from "./PendapatanTransactionTable";
import { PeriodSelection } from "@/components/shared/PeriodModal";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function PendapatanView() {
  const today = getTodayDate();

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodSelection>({
    type: "today",
    label: "Hari Ini",
    startDate: today,
    endDate: today,
  });

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
          <IncomeChartCard
            startDate={selectedPeriod.startDate}
            endDate={selectedPeriod.endDate}
          />
        </div>

        <div className="lg:col-span-5">
          <CategoryPieCard />
        </div>
      </div>

      <PendapatanTransactionTable />
    </motion.section>
  );
}
