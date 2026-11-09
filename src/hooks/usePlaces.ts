
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PlaceFormData, PlaceItem } from "@/types/places.types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

/**
 * Mengubah image_url dari backend menjadi URL yang bisa dimuat browser.
 */
export const resolveImageUrl = (image?: string | null): string => {
  if (!image) return "/images/gereja_kayutangan.png";

  if (image.startsWith("http")) return image;

  if (image.startsWith("/uploads/")) {
    return `${API_ORIGIN}${image}`;
  }

  return image;
};

export function usePlaces() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [editingPlace, setEditingPlace] = useState<PlaceItem | null>(null);
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (message: unknown, fallback: string) =>
    typeof message === "string" ? message : fallback;

  // Mengambil data tempat dari backend.
  const loadPlaces = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/places`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal mengambil data tempat.");
      }

      const rows: any[] = result.data || [];

      setPlaces(
        rows.map((row) => ({
          id: Number(row.id),
          name: row.name,
          category: row.category || "Tanpa kategori",
          image: resolveImageUrl(row.image ?? row.image_url),
          status: row.status === "Nonaktif" ? "Nonaktif" : "Aktif",
          description: row.description || "",
          location: row.location || row.location_address || "",

          latitude:
            row.latitude !== null &&
            row.latitude !== undefined &&
            row.latitude !== ""
              ? Number(row.latitude)
              : null,

          longitude:
            row.longitude !== null &&
            row.longitude !== undefined &&
            row.longitude !== ""
              ? Number(row.longitude)
              : null,
        }))
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Tidak dapat terhubung ke backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPlaces();
  }, [loadPlaces]);

  const handleEdit = (place: PlaceItem) => {
    setEditingPlace(place);
  };

  const handleCloseEdit = () => {
    setEditingPlace(null);
  };

  // Menyimpan data tempat baru atau memperbarui tempat.
  const savePlace = async (
    data: PlaceFormData,
    id?: number
  ): Promise<void> => {
    const formData = new FormData();

    formData.append("name", data.name.trim());
    formData.append("category", data.category);
    formData.append("description", data.description || "");
    formData.append("location", data.location || "");

    // Mengirim koordinat ke backend.
    if (data.latitude !== null && data.latitude !== undefined) {
      formData.append("latitude", String(data.latitude));
    }

    if (data.longitude !== null && data.longitude !== undefined) {
      formData.append("longitude", String(data.longitude));
    }

    // Mengirim gambar baru jika admin memilih gambar.
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }

    const response = await fetch(
      id ? `${API_URL}/places/${id}` : `${API_URL}/places`,
      {
        method: id ? "PUT" : "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        getErrorMessage(result.message, "Gagal menyimpan tempat.")
      );
    }

    await loadPlaces();
  };

  // Menambahkan tempat baru.
  const handleAddNewPlace = async (data: PlaceFormData) => {
    try {
      await savePlace(data);
      alert("Tempat berhasil ditambahkan.");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menambahkan tempat."
      );
      throw error;
    }
  };

  // Memperbarui tempat.
  const handleUpdatePlace = async (data: PlaceFormData) => {
    if (!editingPlace) return;

    try {
      await savePlace(data, editingPlace.id);
      setEditingPlace(null);
      alert("Tempat berhasil diperbarui.");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui tempat."
      );
      throw error;
    }
  };

  // Menghapus tempat.
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah kamu yakin ingin menghapus tempat ini?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/places/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus tempat.");
      }

      await loadPlaces();
      alert("Tempat berhasil dihapus.");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menghapus tempat."
      );
    }
  };

  // Filter tempat berdasarkan nama dan kategori.
  const filteredPlaces = useMemo(
    () =>
      places.filter((place) => {
        const matchesSearch = place.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" ||
          place.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
      }),
    [places, searchTerm, selectedCategory]
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredPlaces,
    places,
    loading,
    editingPlace,
    handleEdit,
    handleCloseEdit,
    handleDelete,
    handleAddNewPlace,
    handleUpdatePlace,
    loadPlaces,
  };
}
