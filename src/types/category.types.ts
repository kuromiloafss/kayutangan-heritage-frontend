export interface CategoryData {
  id: number;
  name: string;
  count: number;
}

/** Data dari form "Tambah Kategori". */
export interface CategoryFormData {
  name: string;
  description: string;
  icon: string;
}
