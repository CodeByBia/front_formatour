"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#8CA08C]"
      style={{ background: "#8CA08C" }}
    >
      <div className="flex w-[900px] h-[450px] bg-white rounded-none shadow-lg overflow-hidden">
        <div className="flex-1 flex items-center justify-center bg-[#F3EFEA]">
          <Image
            src="/van.png"
            alt="Van"
            width={500}
            height={500}
            className="w-500 h-500 object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center px-12 py-8">
          <div className="flex flex-col items-center mb-6">
            <span
              className="font-bold text-3xl text-[#3B5D46] tracking-widest mb-2"
              style={{ letterSpacing: 2 }}
            >
              TOUR
            </span>
            <h1 className="text-2xl font-bold text-[#3B5D46] mb-1">Login</h1>
            <span className="text-gray-600 text-sm mb-6">
              Bem vindo de volta!
            </span>
          </div>
          <form className="flex flex-col gap-4">
            <label className="text-[#3B5D46] text-sm font-semibold">
              Email
            </label>
            <input
              className="rounded border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#3B5D46]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Roberttoalves@gmail.com"
            />
            <label className="text-[#3B5D46] text-sm font-semibold">
              Senha
            </label>
            <div className="relative">
              <input
                className="rounded border border-gray-300 px-4 py-2 bg-white text-black w-full focus:outline-none focus:ring-2 focus:ring-[#3B5D46]"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
              />
              <span className="absolute right-3 top-3 text-gray-400 cursor-pointer select-none">
                <FaEye />
              </span>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                className="flex-1 bg-[#179B5C] text-white py-2 rounded font-semibold hover:bg-[#127a48] transition"
                onClick={() => router.push("/")}
              >
                Entrar
              </button>
              <button
                type="button"
                className="flex-1 border-2 border-[#179B5C] text-[#179B5C] py-2 rounded font-semibold hover:bg-[#e6f4ed] transition"
                onClick={() => router.push("/cadastro")}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
