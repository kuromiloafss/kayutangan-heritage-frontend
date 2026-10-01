"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import TicketHeader from "./TicketHeader";
import TicketTable, { TicketItem } from "./TicketTable";

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

const initialTickets: TicketItem[] = [
  { id: 1, ticketCode: "KH-001245", userName: "Budiman", dateTime: "29 Sep 2026 10.48", status: "Berhasil" },
  { id: 2, ticketCode: "KH-001245", userName: "Budiman", dateTime: "29 Sep 2026 10.48", status: "Berhasil" },
  { id: 3, ticketCode: "KH-001245", userName: "Budiman", dateTime: "29 Sep 2026 10.48", status: "Berhasil" },
  { id: 4, ticketCode: "KH-001245", userName: "Budiman", dateTime: "29 Sep 2026 10.48", status: "Berhasil" },
  { id: 5, ticketCode: "KH-001245", userName: "Budiman", dateTime: "29 Sep 2026 10.48", status: "Berhasil" },
  { id: 6, ticketCode: "KH-001245", userName: "Budiman", dateTime: "29 Sep 2026 10.48", status: "Berhasil" },
  { id: 7, ticketCode: "KH-001245", userName: "Budiman", dateTime: "29 Sep 2026 10.48", status: "Berhasil" },
  { id: 8, ticketCode: "KH-001245", userName: "Budiman", dateTime: "29 Sep 2026 10.48", status: "Berhasil" },
];

export default function TicketView() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [tickets, setTickets] = useState<TicketItem[]>(initialTickets);

  const handleEdit = (item: TicketItem) => {
    alert(`Edit transaksi: ${item.ticketCode}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus data tiket ini?")) {
      setTickets(tickets.filter((t) => t.id !== id));
    }
  };

  const filteredTickets = tickets.filter((item) => {
    const matchesSearch =
      item.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <motion.section
      variants={containerVariants}
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