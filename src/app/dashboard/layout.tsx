import React, { Suspense } from "react";
import Image from "next/image";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-dvh w-full overflow-hidden bg-[#faf9f5]">
      {/* Sidebar utama (desktop) + header & drawer (mobile).
          Suspense wajib karena Sidebar memakai useSearchParams(). */}
      <Suspense fallback={null}>
        <Sidebar />
      </Suspense>

      {/* Konten Utama */}
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto overflow-x-hidden relative bg-[#faf9f5]">
        {/* Watermark Rumah Heritage */}
        <figure className="absolute bottom-0 left-0 right-0 w-full h-[20vh] sm:h-[32vh] pointer-events-none opacity-30 select-none z-0 flex items-end">
          <div className="relative w-full h-full">
            <Image
              src="/images/pattern.png"
              alt="Pattern Heritage"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>
        </figure>

        {/* Tanpa z-index agar modal (fixed z-50) di dalamnya bisa menutupi header/sidebar;
            watermark diletakkan lebih dulu di DOM supaya konten tetap tergambar di atasnya */}
        <div className="px-4 pt-5 sm:p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto relative pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-36">
          {children}
        </div>
      </div>
    </div>
  );
}
