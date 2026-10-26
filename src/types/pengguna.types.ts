import type { ActiveStatus } from "@/types/common.types";

export interface UserItem {
  id: number;
  name: string;
  email: string;
  status: ActiveStatus;
}

/** Data dari form "Tambah Pengguna". */
export interface PenggunaFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
