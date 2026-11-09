
"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import CategoryPickerModal from "@/components/shared/CategoryPickerModal";
import { resolveImageUrl } from "@/hooks/usePlaces";
import type { PlaceFormData, PlaceItem } from "@/types/places.types";

// Peta hanya dijalankan di browser, bukan saat server-side rendering.
const LocationMapPicker = dynamic(
  () => import("./LocationMapPicker"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[230px] rounded-2xl border border-neutral-200 bg-[#f6f7f8] flex items-center justify-center">
        <span className="text-xs text-neutral-400">
          Memuat peta...
        </span>
      </div>
    ),
  }
);

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: PlaceFormData) => Promise<void>;
  initialData?: PlaceItem | null;
}

export default function AddPlaceModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}: AddPlaceModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memeriksa apakah koordinat yang dimasukkan valid.
  const parsedLatitude =
    latitude.trim() !== "" ? Number(latitude) : null;

  const parsedLongitude =
    longitude.trim() !== "" ? Number(longitude) : null;

  const hasValidCoordinates =
    parsedLatitude !== null &&
    parsedLongitude !== null &&
    Number.isFinite(parsedLatitude) &&
    Number.isFinite(parsedLongitude) &&
    parsedLatitude >= -90 &&
    parsedLatitude <= 90 &&
    parsedLongitude >= -180 &&
    parsedLongitude <= 180;

  // Mengisi form saat tambah atau edit tempat.
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setName(initialData.name || "");
      setCategory(initialData.category || "");
      setDescription(initialData.description || "");
      setLocation(initialData.location || "");

      setLatitude(
        initialData.latitude != null
          ? String(initialData.latitude)
          : ""
      );

      setLongitude(
        initialData.longitude != null
          ? String(initialData.longitude)
          : ""
      );

      setImagePreview(initialData.image || null);
      setImageFile(undefined);
    } else {
      setName("");
      setCategory("");
      setDescription("");
      setLocation("");
      setLatitude("");
      setLongitude("");
      setImagePreview(null);
      setImageFile(undefined);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isOpen, initialData]);

  // Memilih gambar.
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5 MB.");
      e.target.value = "";
      return;
    }

    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Mengambil koordinat dari peta.
  const handleMapChange = (
    lat: number,
    lng: number
  ) => {
    setLatitude(String(lat));
    setLongitude(String(lng));
  };

  // Menyimpan tempat.
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama tempat wajib diisi.");
      return;
    }

    if (!category.trim()) {
      alert("Silakan pilih kategori.");
      return;
    }

    if (!location.trim()) {
      alert("Alamat tempat wajib diisi.");
      return;
    }

    if (!hasValidCoordinates) {
      alert("Silakan tentukan titik lokasi yang valid pada peta atau isi koordinat secara manual.");
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        name: name.trim(),
        category,
        description: description.trim(),
        image: imagePreview || "/images/gereja_kayutangan.png",
        location: location.trim(),
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        imageFile,
      });

      handleClose();
    } catch {
      // Form tetap terbuka apabila penyimpanan gagal.
    } finally {
      setSaving(false);
    }
  };

  // Menutup dan membersihkan form.
  const handleClose = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setName("");
    setCategory("");
    setDescription("");
    setLocation("");
    setLatitude("");
    setLongitude("");
    setImagePreview(null);
    setImageFile(undefined);
    setIsCatModalOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
            />

            <motion.article
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-8 shadow-2xl z-10 text-neutral-800 max-h-[92dvh] overflow-y-auto overscroll-contain"
            >
              {/* Header */}
              <header className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#2a3821] tracking-tight">
                    {initialData ? "Edit Tempat" : "Tambah Tempat"}
                  </h2>

                  <p className="text-xs text-neutral-400 mt-1">
                    {initialData
                      ? "Ubah detail tempat wisata yang dipilih."
                      : "Isi detail tempat wisata yang akan ditambahkan."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={saving}
                  className="text-neutral-400 hover:text-neutral-600 transition p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
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

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nama Tempat */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Nama Tempat
                  </label>

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Calathea Garden"
                    className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Kategori
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsCatModalOpen(true)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-left focus:outline-none focus:ring-2 focus:ring-[#718255] transition cursor-pointer"
                  >
                    <span
                      className={
                        category
                          ? "text-neutral-800 font-medium"
                          : "text-neutral-400"
                      }
                    >
                      {category || "Pilih Kategori"}
                    </span>

                    <svg
                      className="w-4 h-4 text-neutral-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Deskripsi
                  </label>

                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tambahkan deskripsi tempat wisata..."
                    className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition resize-none"
                  />
                </div>

                {/* Gambar */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Gambar
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-36 border border-neutral-200/90 rounded-2xl bg-[#f6f7f8] flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-neutral-100 transition relative overflow-hidden group"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={
                            imagePreview.startsWith("blob:") ||
                            imagePreview.startsWith("data:")
                              ? imagePreview
                              : resolveImageUrl(imagePreview)
                          }
                          alt="Preview Tempat"
                          fill
                          unoptimized
                          className="object-cover rounded-xl"
                        />

                        <div className="absolute inset-0 bg-black/35 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition flex items-center justify-center text-white text-[11px] font-medium">
                          Ganti Gambar
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl text-neutral-300">
                          +
                        </span>
                        <p className="text-[11px] text-neutral-400">
                          Klik untuk mengunggah gambar
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          Format gambar maksimal 5 MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lokasi */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Lokasi Tempat
                    </label>

                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Masukkan alamat tempat wisata"
                      className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-neutral-700">
                        Tentukan Titik Koordinat
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-1">
                        Klik titik lokasi tempat wisata pada peta.
                      </p>
                    </div>

                    <span className="text-[10px] text-[#718255] bg-[#718255]/10 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                      OpenStreetMap
                    </span>
                  </div>

                  {/* Peta interaktif */}
                  <LocationMapPicker
                    latitude={hasValidCoordinates ? parsedLatitude : null}
                    longitude={hasValidCoordinates ? parsedLongitude : null}
                    onChange={handleMapChange}
                  />

                  {/* Koordinat */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Latitude
                      </label>

                      <input
                        type="number"
                        step="any"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Contoh: -7.9778"
                        className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                        Longitude
                      </label>

                      <input
                        type="number"
                        step="any"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Contoh: 112.6304"
                        className="w-full px-3.5 py-2.5 bg-[#f6f7f8] border border-neutral-200/80 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#718255] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded-xl bg-[#718255]/10 p-3">
                    <svg
                      className="w-4 h-4 text-[#718255] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16v-4m0-4h.01"
                      />
                    </svg>

                    <p className="text-[10px] text-[#52643d] leading-relaxed">
                      Kamu bisa klik langsung pada peta atau memasukkan
                      koordinat dari Google Maps. Pastikan titik yang
                      dipilih sesuai dengan lokasi tempat wisata.
                    </p>
                  </div>

                  {hasValidCoordinates && (
                    <p className="text-[10px] text-green-700 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      Titik koordinat berhasil ditentukan.
                    </p>
                  )}
                </div>

                {/* Tombol */}
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
                    disabled={saving}
                    className="px-6 py-3 sm:py-2 text-sm sm:text-xs font-medium text-white bg-[#718255] hover:bg-[#607044] rounded-xl shadow-sm transition cursor-pointer disabled:opacity-60"
                  >
                    {saving ? "Menyimpan..." : "Simpan"}
                  </motion.button>
                </footer>
              </form>
            </motion.article>
          </div>
        )}
      </AnimatePresence>

      {/* Pop-up Kategori */}
      <CategoryPickerModal
        isOpen={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
        onSelectCategory={(catName) => setCategory(catName)}
        selectedCategory={category}
      />
    </>
  );
}
