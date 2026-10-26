import type { ActiveStatus } from "@/types/common.types";

export interface PlaceItem {
  id: number;
  image: string;
  name: string;
  category: string;
  status: ActiveStatus;
}

/** Data dari form "Tambah Tempat". */
export interface PlaceFormData {
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
}
