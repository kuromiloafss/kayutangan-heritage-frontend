
import { useCallback, useEffect, useMemo, useState } from "react";
import type { RuteFormData, RuteItem } from "@/types/rute.types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

const resolveImageUrl = (image?: string | null) => {
  if (!image) {
    return "/images/gereja_kayutangan.png";
  }

  if (image.startsWith("http") || image.startsWith("blob:")) {
    return image;
  }

  if (image.startsWith("/uploads/")) {
    return `${API_ORIGIN}${image}`;
  }

  return image;
};

export function useRute() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [ruteList, setRuteList] = useState<RuteItem[]>([]);
  const [editingRute, setEditingRute] = useState<RuteItem | null>(null);

  // ========================================
  // MENGAMBIL DATA RUTE
  // ========================================

  const loadRute = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/routes`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal mengambil data rute."
        );
      }

      const data: RuteItem[] = result.data.map((item: any) => ({
        ...item,

        image: resolveImageUrl(item.image || item.image_url),

        location: item.location || item.location_address || "",

        places: (item.places || [])
          .map((place: any) => ({
            ...place,

            id: Number(place.id),

            image: resolveImageUrl(
              place.image || place.image_url
            ),

            location:
              place.location || place.location_address || "",

            latitude:
              place.latitude !== null &&
              place.latitude !== undefined
                ? Number(place.latitude)
                : null,

            longitude:
              place.longitude !== null &&
              place.longitude !== undefined
                ? Number(place.longitude)
                : null,

            sequence: Number(place.sequence),
          }))
          .sort(
            (a: any, b: any) => a.sequence - b.sequence
          ),
      }));

      setRuteList(data);

      return true;
    } catch (error) {
      console.error("Error mengambil data rute:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data rute dari server."
      );

      return false;
    }
  }, []);

  useEffect(() => {
    loadRute();
  }, [loadRute]);

  // ========================================
  // MEMILIH RUTE UNTUK DIEDIT
  // ========================================

  const handleEdit = (item: RuteItem) => {
    setEditingRute(item);
  };

  // ========================================
  // MEMBATALKAN EDIT
  // ========================================

  const handleCancelEdit = () => {
    setEditingRute(null);
  };

  // ========================================
  // HELPER: MEMBUAT FORM DATA
  // ========================================

  const createRouteFormData = (data: RuteFormData) => {
    const formData = new FormData();

    formData.append("name", data.name.trim());

    formData.append(
      "category",
      data.category || "Sejarah"
    );

    formData.append(
      "description",
      data.description || ""
    );

    formData.append(
      "location",
      data.location || ""
    );

    // Mengirim ID tempat sesuai urutan kunjungan
    formData.append(
      "placeIds",
      JSON.stringify(data.placeIds || [])
    );

    // Gambar hanya dikirim jika admin mengunggah file.
    // Jika tidak, backend akan mempertahankan gambar lama
    // saat edit atau menyimpan null saat tambah.
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }

    return formData;
  };

  // ========================================
  // MENAMBAH RUTE
  // ========================================

  const handleAddNewRute = async (
    data: RuteFormData
  ): Promise<boolean> => {
    try {
      const formData = createRouteFormData(data);

      const response = await fetch(`${API_URL}/routes`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal menambahkan data rute."
        );
      }

      await loadRute();

      alert("Data rute berhasil ditambahkan.");

      return true;
    } catch (error) {
      console.error("Error menambahkan rute:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Gagal menambahkan data rute."
      );

      return false;
    }
  };

  // ========================================
  // MENGUBAH DATA RUTE
  // ========================================

  const handleUpdateRute = async (
    data: RuteFormData
  ): Promise<boolean> => {
    if (!editingRute) return false;

    try {
      const formData = createRouteFormData(data);

      const response = await fetch(
        `${API_URL}/routes/${editingRute.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal memperbarui data rute."
        );
      }

      await loadRute();

      setEditingRute(null);

      alert("Data rute berhasil diperbarui.");

      return true;
    } catch (error) {
      console.error("Error memperbarui rute:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui data rute."
      );

      return false;
    }
  };

  // ========================================
  // MENGHAPUS DATA RUTE
  // ========================================

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah kamu yakin ingin menghapus data rute ini?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/routes/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal menghapus data rute."
        );
      }

      await loadRute();

      alert("Data rute berhasil dihapus.");
    } catch (error) {
      console.error("Error menghapus rute:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Gagal menghapus data rute."
      );
    }
  };

  // ========================================
  // PENCARIAN DAN FILTER KATEGORI
  // ========================================

  const filteredRute = useMemo(() => {
    return ruteList.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        item.category?.toLowerCase() ===
          selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [ruteList, searchTerm, selectedCategory]);

  // ========================================
  // RETURN
  // ========================================

  return {
    searchTerm,
    setSearchTerm,

    selectedCategory,
    setSelectedCategory,

    ruteList,
    filteredRute,

    editingRute,

    loadRute,
    handleEdit,
    handleCancelEdit,
    handleUpdateRute,
    handleDelete,
    handleAddNewRute,
  };
}
