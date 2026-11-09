
import type { ActiveStatus } from "@/types/common.types";

export interface RutePlaceItem {
  id: number;
  name: string;
  image?: string;
  description?: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
  status?: ActiveStatus;
  sequence?: number;
}

export interface RuteItem {
  id: number;
  image: string;
  name: string;
  category: string;
  status: ActiveStatus;
  description?: string;
  location?: string;
  places?: RutePlaceItem[];
}

export interface RuteFormData {
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
  imageFile?: File;
  placeIds: number[];
}
