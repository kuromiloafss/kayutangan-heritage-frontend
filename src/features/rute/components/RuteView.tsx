
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ManagementHeader from "@/components/shared/ManagementHeader";
import { pageEnterVariants } from "@/lib/animations";
import { useRute } from "@/hooks/useRute";
import RuteTable from "./RuteTable";
import AddRuteModal from "./AddRuteModal";

export default function RuteView() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredRute,
    editingRute,
    handleEdit,
    handleCancelEdit,
    handleUpdateRute,
    handleDelete,
    handleAddNewRute,
  } = useRute();

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    handleCancelEdit();
  };

 const handleSubmitRute = async (
  data: Parameters<typeof handleAddNewRute>[0]
): Promise<boolean> => {
  let success = false;

  if (editingRute) {
    success = await handleUpdateRute(data);
  } else {
    success = await handleAddNewRute(data);
  }

  if (success) {
    setIsAddModalOpen(false);
    handleCancelEdit();
  }

  return success;
};
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
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          }
          title="Kelola Rute"
          description="Kelola rute wisata yang tersedia untuk pengunjung."
          addLabel="Tambah Rute"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        <RuteTable
          data={filteredRute}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.section>

      <AddRuteModal
        key={editingRute?.id ?? "new"}
        isOpen={Boolean(isAddModalOpen || editingRute)}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRute}
        initialData={editingRute}
      />
    </>
  );
}
