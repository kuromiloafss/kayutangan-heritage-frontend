"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import RuteHeader from "./RuteHeader";
import RuteTable, { RuteItem } from "./RuteTable";
import AddRuteModal from "./AddRuteModal";

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

const initialRute: RuteItem[] = [
  { id: 1, image: "/images/gereja_kayutangan.png", name: "Kali sukun", category: "Sejarah", status: "Aktif" },
  { id: 2, image: "/images/gereja_kayutangan.png", name: "Kali sukun", category: "Sejarah", status: "Aktif" },
  { id: 3, image: "/images/gereja_kayutangan.png", name: "Kali sukun", category: "Sejarah", status: "Aktif" },
  { id: 4, image: "/images/gereja_kayutangan.png", name: "Kali sukun", category: "Sejarah", status: "Aktif" },
];

export default function RuteView() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [ruteList, setRuteList] = useState<RuteItem[]>(initialRute);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleEdit = (item: RuteItem) => {
    alert(`Edit rute: ${item.name}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah kamu yakin ingin menghapus data rute ini?")) {
      setRuteList(ruteList.filter((r) => r.id !== id));
    }
  };

  const handleAddNewRute = (data: {
    name: string;
    category: string;
    description: string;
    image: string;
    location: string;
  }) => {
    const newRute: RuteItem = {
      id: Date.now(),
      name: data.name,
      category: data.category || "Sejarah",
      image: data.image,
      status: "Aktif",
    };
    setRuteList([newRute, ...ruteList]);
  };

  const filteredRute = ruteList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
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
        <RuteHeader
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
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddNewRute}
      />
    </>
  );
}