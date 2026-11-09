
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { resolveImageUrl, usePlaces } from "@/hooks/usePlaces";
import type { PlaceItem } from "@/types/places.types";
import type { RuteFormData, RuteItem } from "@/types/rute.types";

interface AddRuteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RuteFormData) => boolean | Promise<boolean>;
  initialData?: RuteItem | null;
}

export default function AddRuteModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}: AddRuteModalProps) {
  const { filteredPlaces, loading: loadingPlaces } = usePlaces();

  const [selectedPlaceIds, setSelectedPlaceIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);

  // ========================================
  // RESET FORM SAAT MODAL DIBUKA
  // ========================================

  useEffect(() => {
    if (!isOpen) return;

    const existingPlaces = [...(initialData?.places ?? [])]
      .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0))
      .map((place) => place.id);

    setSelectedPlaceIds(existingPlaces);
  }, [isOpen, initialData]);

  // ========================================
  // TEMPAT YANG DIPILIH
  // ========================================

  const selectedPlaces = useMemo(() => {
    return selectedPlaceIds
      .map((id) => filteredPlaces.find((place) => place.id === id))
      .filter((place): place is PlaceItem => Boolean(place));
  }, [selectedPlaceIds, filteredPlaces]);

  // ========================================
  // PILIH / BATAL PILIH TEMPAT
  // ========================================

  const handleTogglePlace = (placeId: number) => {
    setSelectedPlaceIds((previous) => {
      if (previous.includes(placeId)) {
        return previous.filter((id) => id !== placeId);
      }

      return [...previous, placeId];
    });
  };

  // ========================================
  // ATUR URUTAN KUNJUNGAN
  // ========================================

  const handleMovePlace = (
    index: number,
    direction: "up" | "down"
  ) => {
    setSelectedPlaceIds((previous) => {
      const updatedIds = [...previous];

      const targetIndex =
        direction === "up" ? index - 1 : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= updatedIds.length
      ) {
        return previous;
      }

      [updatedIds[index], updatedIds[targetIndex]] = [
        updatedIds[targetIndex],
        updatedIds[index],
      ];

      return updatedIds;
    });
  };

  // ========================================
  // SIMPAN RUTE
  // ========================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (saving) return;

    if (selectedPlaceIds.length === 0) {
      alert("Pilih minimal satu tempat wisata.");
      return;
    }

    if (selectedPlaces.length !== selectedPlaceIds.length) {
      alert(
        "Ada tempat yang tidak ditemukan. Periksa kembali pilihan tempat."
      );
      return;
    }

    // Validasi koordinat sebelum dikirim
    const placesWithoutCoordinates = selectedPlaces.filter(
      (place) => {
        const latitude = Number(place.latitude);
        const longitude = Number(place.longitude);

        return (
          place.latitude === null ||
          place.latitude === undefined ||
          place.longitude === null ||
          place.longitude === undefined ||
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude) ||
          latitude < -90 ||
          latitude > 90 ||
          longitude < -180 ||
          longitude > 180
        );
      }
    );

    if (placesWithoutCoordinates.length > 0) {
      alert(
        `Tempat berikut belum memiliki koordinat valid:\n\n${placesWithoutCoordinates
          .map((place) => `• ${place.name}`)
          .join("\n")}\n\nLengkapi koordinat melalui Kelola Tempat terlebih dahulu.`
      );
      return;
    }

    setSaving(true);

    try {
      // Membuat nama rute otomatis berdasarkan tempat terpilih
      const firstPlace = selectedPlaces[0];
      const lastPlace = selectedPlaces[selectedPlaces.length - 1];

      const generatedName =
        selectedPlaces.length === 1
          ? `Rute ${firstPlace.name}`
          : `Rute ${firstPlace.name} - ${lastPlace.name}`;

      // Mengambil kategori dari tempat pertama
      const generatedCategory = firstPlace.category || "";

      // Menggabungkan alamat tempat berdasarkan urutan
      const generatedLocation = selectedPlaces
        .map((place) => place.location)
        .filter((value): value is string => Boolean(value))
        .join(" → ");

      const success = await onSubmit({
        name: generatedName,
        category: generatedCategory,
        description: "",
        image: "",
        location: generatedLocation,
        placeIds: selectedPlaceIds,
      });

      if (!success) return;
    } catch (error) {
      console.error("Gagal menyimpan rute:", error);
      alert("Terjadi kesalahan saat menyimpan rute.");
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // TUTUP MODAL
  // ========================================

  const handleClose = () => {
    if (saving) return;

    setSelectedPlaceIds([]);
    onClose();
  };

  // ========================================
  // TAMPILAN
  // ========================================

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          {/* Modal */}
          <motion.article
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-8 shadow-2xl z-10 text-neutral-800 max-h-[92dvh] overflow-y-auto overscroll-contain"
          >
            {/* HEADER */}
            <header className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#2a3821] tracking-tight">
                  {initialData ? "Edit Rute" : "Tambah Rute"}
                </h2>

                <p className="text-xs text-neutral-400 mt-1">
                  Pilih tempat wisata dan tentukan urutan kunjungannya.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="text-neutral-400 hover:text-neutral-600 transition p-1 rounded-full hover:bg-neutral-100 cursor-pointer disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* INFORMASI */}
              <div className="bg-[#718255]/5 border border-[#718255]/15 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#718255]/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-[#718255]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
                      />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#2a3821]">
                      Rute berdasarkan tempat wisata
                    </p>

                    <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                      Pilih beberapa tempat yang sudah terdaftar di Kelola Tempat.
                      Sistem akan menggunakan koordinat setiap tempat untuk
                      mendukung navigasi pengunjung.
                    </p>
                  </div>
                </div>
              </div>

              {/* PILIH TEMPAT */}
              <section className="border border-neutral-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#2a3821]">
                      Pilih Tempat Wisata
                    </h3>

                    <p className="text-[11px] text-neutral-400 mt-1">
                      Pilih tempat yang ingin dimasukkan ke dalam rute.
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-[#718255] bg-[#718255]/10 px-3 py-1.5 rounded-full">
                    {selectedPlaceIds.length} dipilih
                  </span>
                </div>

                {loadingPlaces ? (
                  <div className="py-8 text-center text-xs text-neutral-400">
                    Memuat daftar tempat...
                  </div>
                ) : filteredPlaces.length === 0 ? (
                  <div className="py-8 text-center bg-[#f6f7f8] rounded-xl">
                    <p className="text-xs font-medium text-neutral-500">
                      Belum ada tempat wisata.
                    </p>

                    <p className="text-[11px] text-neutral-400 mt-1">
                      Tambahkan tempat terlebih dahulu melalui Kelola Tempat.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {filteredPlaces.map((place) => {
                      const checked = selectedPlaceIds.includes(place.id);

                      const hasCoordinates =
                        place.latitude !== null &&
                        place.latitude !== undefined &&
                        place.longitude !== null &&
                        place.longitude !== undefined &&
                        Number.isFinite(Number(place.latitude)) &&
                        Number.isFinite(Number(place.longitude)) &&
                        Number(place.latitude) >= -90 &&
                        Number(place.latitude) <= 90 &&
                        Number(place.longitude) >= -180 &&
                        Number(place.longitude) <= 180;

                      return (
                        <label
                          key={place.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                            checked
                              ? "border-[#718255] bg-[#718255]/5"
                              : "border-neutral-200 hover:bg-neutral-50"
                          } ${
                            place.status === "Nonaktif"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={place.status === "Nonaktif"}
                            onChange={() => handleTogglePlace(place.id)}
                            className="mt-1 accent-[#718255]"
                          />

                          <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                            <Image
                              src={
                                place.image
                                  ? resolveImageUrl(place.image)
                                  : "/images/gereja_kayutangan.png"
                              }
                              alt={place.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-neutral-800">
                              {place.name}
                            </p>

                            <p className="text-[10px] text-neutral-400 mt-1">
                              {place.category || "Tanpa kategori"}
                            </p>

                            <p className="text-[10px] text-neutral-500 mt-1">
                              {place.location || "Alamat belum tersedia"}
                            </p>

                            <div className="flex items-center gap-1.5 mt-2">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  hasCoordinates
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              />

                              <p
                                className={`text-[10px] ${
                                  hasCoordinates
                                    ? "text-green-700"
                                    : "text-red-500"
                                }`}
                              >
                                {hasCoordinates
                                  ? `${place.latitude}, ${place.longitude}`
                                  : "Koordinat belum tersedia"}
                              </p>
                            </div>

                            {place.status === "Nonaktif" && (
                              <p className="text-[10px] text-red-500 mt-1">
                                Tempat nonaktif
                              </p>
                            )}
                          </div>

                          {checked && (
                            <span className="text-[#718255] text-xs font-bold">
                              ✓
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* URUTAN KUNJUNGAN */}
              <section className="border border-neutral-200 rounded-2xl p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-[#2a3821]">
                    Urutan Kunjungan
                  </h3>

                  <p className="text-[11px] text-neutral-400 mt-1">
                    Atur tempat yang akan dikunjungi pertama hingga terakhir.
                  </p>
                </div>

                {selectedPlaces.length === 0 ? (
                  <div className="text-center py-6 bg-[#f6f7f8] rounded-xl">
                    <p className="text-xs text-neutral-400">
                      Belum ada tempat yang dipilih.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedPlaces.map((place, index) => (
                      <div
                        key={place.id}
                        className="flex items-center gap-3 p-3 bg-[#f6f7f8] rounded-xl border border-neutral-100"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#718255] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-neutral-800 truncate">
                            {place.name}
                          </p>

                          <p className="text-[10px] text-neutral-400 mt-1 truncate">
                            {place.location || "Alamat belum tersedia"}
                          </p>

                          <p className="text-[10px] text-neutral-500 mt-1">
                            {place.latitude != null &&
                            place.longitude != null
                              ? `${place.latitude}, ${place.longitude}`
                              : "Koordinat belum tersedia"}
                          </p>
                        </div>

                        <div className="flex gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMovePlace(index, "up")}
                            className="w-7 h-7 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Naik"
                          >
                            ↑
                          </button>

                          <button
                            type="button"
                            disabled={index === selectedPlaces.length - 1}
                            onClick={() => handleMovePlace(index, "down")}
                            className="w-7 h-7 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Turun"
                          >
                            ↓
                          </button>

                          <button
                            type="button"
                            onClick={() => handleTogglePlace(place.id)}
                            className="w-7 h-7 rounded-lg bg-white border border-neutral-200 text-red-500 hover:bg-red-50"
                            title="Hapus dari rute"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* FOOTER */}
              <footer className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2.5 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleClose}
                  disabled={saving}
                  className="px-6 py-3 sm:py-2 text-sm sm:text-xs font-medium text-neutral-600 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition cursor-pointer disabled:opacity-60"
                >
                  Batal
                </motion.button>

                <motion.button
                  whileHover={{ scale: saving ? 1 : 1.02 }}
                  whileTap={{ scale: saving ? 1 : 0.98 }}
                  type="submit"
                  disabled={saving || loadingPlaces}
                  className="px-6 py-3 sm:py-2 text-sm sm:text-xs font-medium text-white bg-[#718255] hover:bg-[#607044] rounded-xl shadow-sm transition cursor-pointer disabled:opacity-60"
                >
                  {saving
                    ? "Menyimpan..."
                    : initialData
                      ? "Simpan Perubahan"
                      : "Simpan Rute"}
                </motion.button>
              </footer>
            </form>
          </motion.article>
        </div>
      )}
    </AnimatePresence>
  );
}
