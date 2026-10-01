import React from "react";
import Image from "next/image";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#faf9f5]">
      {/* Sidebar utama */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden relative bg-[#faf9f5]">
        <div className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto relative z-10 pb-36">
          {children}
        </div>

        {/* Watermark Rumah Heritage */}
        <figure className="absolute bottom-0 left-0 right-0 w-full h-[28vh] sm:h-[32vh] pointer-events-none opacity-30 select-none z-0 flex items-end">
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
      </div>
    </div>
  );
}