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

  return (
    <>
      {/* 1. DASHBOARD UTAMA */}
      {currentTab === "dashboard" && <DashboardView key="dashboard-view" />}

      {/* 2. KELOLA TEMPAT */}
      {currentTab === "tempat" && (
        <div key="places-view">
          <PlacesView />
        </div>
      )}

      {/* 3. KELOLA RUTE */}
      {currentTab === "rute" && (
        <div key="rute-view">
          <RuteView />
        </div>
      )}

      {/* 4. KELOLA KATEGORI */}
      {currentTab === "kategori" && (
        <div key="category-view">
          <CategoryView />
        </div>
      )}

      {/* 5. KELOLA TIKET */}
      {currentTab === "tiket" && (
        <div key="ticket-view">
          <TicketView />
        </div>
      )}

      {/* 6. LAPORAN PENDAPATAN */}
      {currentTab === "pendapatan" && (
        <div key="pendapatan-view">
          <PendapatanView />
        </div>
      )}

      {/* 7. KELOLA PENGGUNA */}
      {currentTab === "pengguna" && (
        <div key="pengguna-view">
          <PenggunaView />
        </div>
      )}

      {/* TAB TIDAK DIKENAL (HANYA MUNCUL JIKA QUERY PARAMETER SALAH KETIK) */}
      {![
        "dashboard",
        "tempat",
        "rute",
        "kategori",
        "tiket",
        "pendapatan",
        "pengguna",
      ].includes(currentTab) && (
        <div className="p-8 bg-white rounded-3xl border border-neutral-100 shadow-sm text-center">
          <p className="text-sm text-neutral-500 font-medium">
            Menu tidak ditemukan.
          </p>
        </div>
      )}
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-neutral-400 text-xs">Memuat data...</div>}>
      <DashboardContent />
    </Suspense>
  );
}