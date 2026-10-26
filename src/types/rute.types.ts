import type { ActiveStatus } from "@/types/common.types";

export interface RuteItem {
  id: number;
  image: string;
  name: string;
  category: string;
  status: ActiveStatus;
}

/** Data dari form "Tambah Rute Wisata". */
export interface RuteFormData {
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
}
