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
    editingUser,
    handleEdit,
    handleCancelEdit,
    handleUpdateUser,
    handleDelete,
    handleAddNewUser,
  } = usePengguna();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    handleCancelEdit();
  };

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

      <AddPenggunaModal
        key={editingUser?.id ?? "new"}
        isOpen={isAddModalOpen || editingUser !== null}
        onClose={handleCloseModal}
        onSubmit={(data) => {
          if (editingUser) {
            handleUpdateUser(data);
          } else {
            handleAddNewUser(data);
          }

          setIsAddModalOpen(false);
        }}
        editData={editingUser}
      />
    </>
  );
}