import { useState } from "react";
import { mockUsers } from "@/features/pengguna/data/users.mock";
import type { PenggunaFormData, UserItem } from "@/types/pengguna.types";

export function usePengguna() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserItem[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  // Membuka mode edit
  const handleEdit = (item: UserItem) => {
    setEditingUser(item);
  };

  // Menutup mode edit
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // Menyimpan perubahan pengguna
  const handleUpdateUser = (data: PenggunaFormData) => {
    if (!editingUser) return;

    setUsers((previous) =>
      previous.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: data.fullName,
              email: data.email,
            }
          : user
      )
    );

    setEditingUser(null);
  };

  // Menghapus pengguna
  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus akun pengguna ini?")) {
      setUsers((previous) => previous.filter((user) => user.id !== id));
    }
  };

  // Menambahkan pengguna baru
  const handleAddNewUser = (data: PenggunaFormData) => {
    const newUser: UserItem = {
      id: Date.now(),
      name: data.fullName,
      email: data.email,
      status: "Aktif",
    };

    setUsers((previous) => [newUser, ...previous]);
  };

  const filteredUsers = users.filter((item) => {
    const term = searchTerm.toLowerCase();

    return (
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term)
    );
  });

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers,
    editingUser,
    handleEdit,
    handleCancelEdit,
    handleUpdateUser,
    handleDelete,
    handleAddNewUser,
  };
}