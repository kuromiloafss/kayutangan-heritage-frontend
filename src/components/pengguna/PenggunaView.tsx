"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import PenggunaHeader from "./PenggunaHeader";
import PenggunaTable, { UserItem } from "./PenggunaTable";
import AddPenggunaModal from "./AddPenggunaModal";

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

const initialUsers: UserItem[] = [
  { id: 1, name: "Budilah", email: "Budilahmana@gmail.com", status: "Aktif" },
  { id: 2, name: "Budilah", email: "Budilahmana@gmail.com", status: "Aktif" },
  { id: 3, name: "Budilah", email: "Budilahmana@gmail.com", status: "Aktif" },
  { id: 4, name: "Budilah", email: "Budilahmana@gmail.com", status: "Aktif" },
  { id: 5, name: "Budilah", email: "Budilahmana@gmail.com", status: "Aktif" },
  { id: 6, name: "Budilah", email: "Budilahmana@gmail.com", status: "Aktif" },
  { id: 7, name: "Budilah", email: "Budilahmana@gmail.com", status: "Aktif" },
  { id: 8, name: "Budilah", email: "Budilahmana@gmail.com", status: "Aktif" },
];

export default function PenggunaView() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<UserItem[]>(initialUsers);

  // State untuk modal Tambah Pengguna
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleEdit = (item: UserItem) => {
    alert(`Edit user: ${item.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus akun pengguna ini?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleAddNewUser = (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => {
    const newUser: UserItem = {
      id: Date.now(),
      name: data.fullName,
      email: data.email,
      status: "Aktif",
    };
    setUsers([newUser, ...users]);
  };

  const filteredUsers = users.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <motion.section
        variants={containerVariants}
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