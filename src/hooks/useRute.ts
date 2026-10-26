import { useState } from "react";
import { mockRute } from "@/features/rute/data/rute.mock";
import type { RuteFormData, RuteItem } from "@/types/rute.types";

/** State daftar rute beserta pencarian, filter kategori, dan aksi tambah/edit/hapus. */
export function useRute() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [ruteList, setRuteList] = useState<RuteItem[]>(mockRute);

  const handleEdit = (item: RuteItem) => {
    alert(`Edit rute: ${item.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus data rute ini?")) {
      setRuteList(ruteList.filter((r) => r.id !== id));
    }
  };

  const handleAddNewRute = (data: RuteFormData) => {
    const newRute: RuteItem = {
      id: Date.now(),
      name: data.name,
      category: data.category || "Sejarah",
      image: data.image,
      status: "Aktif",
    };
    setRuteList([newRute, ...ruteList]);
  };

  const filteredRute = ruteList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredRute,
    handleEdit,
    handleDelete,
    handleAddNewRute,
  };
}
