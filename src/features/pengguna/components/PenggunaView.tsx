"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { pageEnterVariants } from "@/lib/animations";
import { usePengguna } from "@/hooks/usePengguna";
import PenggunaHeader from "./PenggunaHeader";
import PenggunaTable from "./PenggunaTable";
import AddPenggunaModal from "./AddPenggunaModal";

export default function PenggunaView() {
  const {
    searchTerm,
    setSearchTerm,
    filteredUsers,
    handleEdit,
    handleDelete,
    handleAddNewUser,
  } = usePengguna();

  // State untuk modal Tambah Pengguna
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  return (
    <>
      <motion.section
        variants={pageEnterVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <PenggunaHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        <PenggunaTable
          data={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.section>

      {/* Pop-up Tambah Pengguna */}
      <AddPenggunaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddNewUser}
      />
    </>
  );
}
