import { useState } from "react";
import { mockPlaces } from "@/features/places/data/places.mock";
import type { PlaceFormData, PlaceItem } from "@/types/places.types";

/** State daftar tempat beserta pencarian, filter kategori, dan aksi tambah/edit/hapus. */
export function usePlaces() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [places, setPlaces] = useState<PlaceItem[]>(mockPlaces);

  const handleEdit = (place: PlaceItem) => {
    alert(`Edit tempat: ${place.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus data tempat ini?")) {
      setPlaces(places.filter((p) => p.id !== id));
    }
  };

  const handleAddNewPlace = (data: PlaceFormData) => {
    const newPlace: PlaceItem = {
      id: Date.now(),
      name: data.name,
      category: data.category || "Sejarah",
      image: data.image,
      status: "Aktif",
    };
    setPlaces([newPlace, ...places]);
  };

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      place.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredPlaces,
    handleEdit,
    handleDelete,
    handleAddNewPlace,
  };
}
