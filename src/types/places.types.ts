import type { ActiveStatus } from "@/types/common.types";

export interface PlaceItem {
  id: number;
  image: string;
  name: string;
  category: string;
  status: ActiveStatus;
  description?: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface PlaceFormData {
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  imageFile?: File;
}