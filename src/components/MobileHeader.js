"use client";

export default function MobileHeader({ onMenuClick }) {
  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-black text-white">
      <button onClick={onMenuClick} className="text-2xl">
        ☰
      </button>
      <h1 className="font-bold text-lg">🚀 JobFinder</h1>
      <div />
    </div>
  );
}
