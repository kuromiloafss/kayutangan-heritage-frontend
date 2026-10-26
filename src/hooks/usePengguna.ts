import { useState } from "react";
import { mockUsers } from "@/features/pengguna/data/users.mock";
import type { PenggunaFormData, UserItem } from "@/types/pengguna.types";

/** State daftar pengguna beserta pencarian dan aksi tambah/edit/hapus. */
export function usePengguna() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<UserItem[]>(mockUsers);

  const handleEdit = (item: UserItem) => {
    alert(`Edit user: ${item.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus akun pengguna ini?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleAddNewUser = (data: PenggunaFormData) => {
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

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers,
    handleEdit,
    handleDelete,
    handleAddNewUser,
  };
}
