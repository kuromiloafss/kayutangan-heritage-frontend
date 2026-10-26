import type { TransactionStatus } from "@/types/common.types";

export interface TicketItem {
  id: number;
  ticketCode: string;
  userName: string;
  dateTime: string;
  status: TransactionStatus;
}
