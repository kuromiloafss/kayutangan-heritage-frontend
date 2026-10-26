import { useState } from "react";
import { mockTickets } from "@/features/tickets/data/tickets.mock";
import type { TicketItem } from "@/types/tickets.types";

/** State daftar tiket beserta pencarian, periode, dan aksi edit/hapus. */
export function useTickets() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [tickets, setTickets] = useState<TicketItem[]>(mockTickets);

  const handleEdit = (item: TicketItem) => {
    alert(`Edit transaksi: ${item.ticketCode}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus data tiket ini?")) {
      setTickets(tickets.filter((t) => t.id !== id));
    }
  };

  // Periode belum dipakai untuk memfilter (data masih contoh)
  const filteredTickets = tickets.filter((item) => {
    const matchesSearch =
      item.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedPeriod,
    setSelectedPeriod,
    filteredTickets,
    handleEdit,
    handleDelete,
  };
}
