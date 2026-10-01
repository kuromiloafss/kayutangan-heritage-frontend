"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import PlacesHeader from "./PlacesHeader";
import PlacesTable, { PlaceItem } from "./PlacesTable";
import AddPlaceModal from "./AddPlaceModal";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const initialPlaces: PlaceItem[] = [
  { id: 1, image: "/images/gereja_kayutangan.png", name: "Kali sukun", category: "Sejarah", status: "Aktif" },
  { id: 2, image: "/images/gereja_kayutangan.png", name: "Kali sukun", category: "Sejarah", status: "Aktif" },
  { id: 3, image: "/images/gereja_kayutangan.png", name: "Kali sukun", category: "Sejarah", status: "Aktif" },
  { id: 4, image: "/images/gereja_kayutangan.png", name: "Kali sukun", category: "Sejarah", status: "Aktif" },
];

export default function PlacesView() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [places, setPlaces] = useState<PlaceItem[]>(initialPlaces);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleEdit = (place: PlaceItem) => {
    alert(`Edit tempat: ${place.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus data tempat ini?")) {
      setPlaces(places.filter((p) => p.id !== id));
    }
  };

  const handleAddNewPlace = (data: {
    name: string;
    category: string;
    description: string;
    image: string;
    location: string;
  }) => {
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

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <PlacesHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        <PlacesTable
          data={filteredPlaces}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.section>

      <AddPlaceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddNewPlace}
      />
    </>
  );
}