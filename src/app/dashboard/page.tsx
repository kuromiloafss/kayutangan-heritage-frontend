
"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { DashboardView } from "@/features/dashboard";
import { PlacesView } from "@/features/places";
import { RuteView } from "@/features/rute";
import { CategoryView } from "@/features/category";
import { TicketView } from "@/features/tickets";
import { PendapatanView } from "@/features/pendapatan";
import { PenggunaView } from "@/features/pengguna";

function DashboardContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab") || "dashboard";

  const validTabs = [
    "dashboard",
    "tempat",
    "rute",
    "kategori",
    "tiket",
    "pendapatan",
    "pengguna",
  ];

  return (
    <>
      {currentTab === "dashboard" && (
        <DashboardView key="dashboard-view" />
      )}

      {currentTab === "tempat" && <PlacesView />}

      {currentTab === "rute" && <RuteView />}

      {currentTab === "kategori" && <CategoryView />}

      {currentTab === "tiket" && <TicketView />}

      {currentTab === "pendapatan" && <PendapatanView />}

      {currentTab === "pengguna" && <PenggunaView />}

      {!validTabs.includes(currentTab) && (
        <div className="p-8 bg-white rounded-3xl border text-center">
          <p className="text-sm text-neutral-500">
            Menu tidak ditemukan.
          </p>
        </div>
      )}
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          Memuat dashboard...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
