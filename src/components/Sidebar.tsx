"use client";
import React from 'react';
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const buttonClass = (active: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition
    ${active ? "bg-white text-[#3B5D46]" : "text-white hover:bg-[#4e7a5a]"}`;

  return (
    <aside className="w-64 bg-[#3B5D46] min-h-screen flex flex-col py-8 px-4">
      <div className="mb-12 flex items-center justify-center">
        <span className="font-bold text-2xl text-white tracking-widest" style={{letterSpacing:2}}>TOUR</span>
      </div>
      <nav className="flex flex-col gap-2">
        <button
          className={buttonClass(pathname === "/")}
          onClick={() => router.push("/")}
        >
          <span className="material-icons">home</span>
          Home
        </button>
        <button
          className={buttonClass(pathname === "/perfil")}
          onClick={() => router.push("/perfil")}
        >
          <span className="material-icons">person</span>
          Perfil
        </button>
      </nav>
    </aside>
  );
}
