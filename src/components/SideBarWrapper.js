"use client";

import { useState } from "react";
import MobileHeader from "./MobileHeader";
import Sidebar from "./Sidebar";

export default function SideBarWrapper({ children }) {
  const [isOpen, setIsOpen] = useState(null);

  return (
    <>
      <MobileHeader onMenuClick={() => setIsOpen(true)} />

      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 md:ml-64 p-4 sm:p-6 overflow-y-auto h-screen">
          {children}
        </main>
      </div>
    </>
  );
}
