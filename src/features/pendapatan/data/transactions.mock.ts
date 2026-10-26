// Data contoh sementara sampai tersedia API backend.
import type { TransaksiItem } from "@/types/pendapatan.types";

export const mockTransactions: TransaksiItem[] = [
  { id: 1, ticketCode: "KH-001245", buyerName: "Anis", date: "29 Sep 2026", category: "Warlok", paymentMethod: "QRIS", status: "Berhasil", price: "Rp 5.000" },
  { id: 2, ticketCode: "KH-001244", buyerName: "Pranoro", date: "29 Sep 2026", category: "Turis", paymentMethod: "QRIS", status: "Berhasil", price: "Rp 10.000" },
  { id: 3, ticketCode: "KH-001243", buyerName: "Solo", date: "29 Sep 2026", category: "Warlok", paymentMethod: "QRIS", status: "Berhasil", price: "Rp 5.000" },
];
