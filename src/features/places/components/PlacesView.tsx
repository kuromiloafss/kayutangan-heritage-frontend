"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ManagementHeader from "@/components/shared/ManagementHeader";
import { pageEnterVariants } from "@/lib/animations";
import { usePlaces } from "@/hooks/usePlaces";
import PlacesTable from "./PlacesTable";
import AddPlaceModal from "./AddPlaceModal";

export default function PlacesView() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredPlaces,
    handleEdit,
    handleDelete,
    handleAddNewPlace,
  } = usePlaces();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <>
      <motion.section
        variants={pageEnterVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <ManagementHeader
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          title="Kelola Tempat"
          description="Kelola data wisata yang tersedia di aplikasi."
          addLabel="Tambah Tempat"
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
