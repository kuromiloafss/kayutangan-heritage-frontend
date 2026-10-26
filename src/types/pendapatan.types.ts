import type { TransactionStatus } from "@/types/common.types";

export interface TransaksiItem {
  id: number;
  ticketCode: string;
  buyerName: string;
  date: string;
  category: "Warlok" | "Turis";
  paymentMethod: string;
  status: TransactionStatus;
  price: string;
}
