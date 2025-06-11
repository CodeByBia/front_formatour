// File: src/components/Sidebar.tsx

"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import Image from "next/image";
import { FaDoorOpen } from "react-icons/fa6";
import { RiLoginBoxFill } from "react-icons/ri";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const buttonClass = (active: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-lg transition
    ${active ? "bg-white text-[#3B5D46]" : "text-white hover:bg-[#4e7a5a]"}`;

  return (
    <aside className="w-64 bg-[#3B5D46] min-h-screen flex flex-col py-6 px-4">
      <div className="mb-12 h-25 bg-white rounded-sm flex items-center justify-center">
        <Image
          src="logo.svg"
          alt="TOUR"
          width={150}
          height={150}
        />
      </div>
      <nav className="flex flex-col gap-2">
        <button
          className={buttonClass(pathname === "/")}
          onClick={() => router.push("/")}
        >
          <FaHome size={26} />
          Home
        </button>
        <button
          className={buttonClass(pathname === "/perfil")}
          onClick={() => router.push("/perfil")}
        >
          <IoPersonCircle size={30} />
          Perfil
        </button>

        <button
          className={buttonClass(pathname === "/login")}
          onClick={() => router.push("/login")}
        >
          <RiLoginBoxFill size={26} />
          Login
        </button>

        <button
          className={buttonClass(pathname === "/cadastro")}
          onClick={() => router.push("/cadastro")}
        >
          <FaDoorOpen size={26} />
          Cadastro
        </button>
      </nav>
    </aside>
  );
}
