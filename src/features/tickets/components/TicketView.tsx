"use client";

import React from "react";
import { motion } from "framer-motion";
import { pageEnterVariants } from "@/lib/animations";
import { useTickets } from "@/hooks/useTickets";
import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";

export default function TicketView() {
  const {
    searchTerm,
    setSearchTerm,
    selectedPeriod,
    setSelectedPeriod,
    filteredTickets,
    handleEdit,
    handleDelete,
  } = useTickets();

  return (
    <motion.section
      variants={pageEnterVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <TicketHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <TicketTable
        data={filteredTickets}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </motion.section>
  );
}
