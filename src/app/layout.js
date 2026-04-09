"use client";

import "./globals.css";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import QueryProvider from "@/components/QueryProvider";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {/* 🔥 MOBILE HEADER */}
          <MobileHeader onMenuClick={() => setIsOpen(true)} />

          <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <main className="flex-1 md:ml-64 p-4 sm:p-6 overflow-y-auto h-screen">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
