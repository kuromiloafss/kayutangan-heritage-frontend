export interface CategoryData {
  id: number;
  name: string;
  count: number;
  description?: string;
  icon: string;
}

/** Data dari form Tambah/Edit Kategori. */
export interface CategoryFormData {
  name: string;
  description: string;
  icon: string;
}
