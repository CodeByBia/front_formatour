"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8CA08C] px-2">
      <div className="flex flex-col md:flex-row w-full max-w-4xl md:h-[520px] bg-white rounded-none shadow-lg overflow-hidden">
        <div className="flex-1 flex items-center justify-center bg-[#F3EFEA] min-h-[220px]">
        <Image src="/van.png" alt="Van" width={500} height={500} className="w-500 h-500 object-contain" />
        </div>
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-8">
          <div className="flex flex-col items-center mb-6">
            <span className="font-bold text-3xl text-[#3B5D46] tracking-widest mb-2" style={{letterSpacing:2}}>TOUR</span>
            <h1 className="text-2xl font-bold text-[#3B5D46] mb-1">Cadastro</h1>
            <span className="text-gray-600 text-sm mb-6 text-center">Preencha os campos para criar sua conta</span>
          </div>
          <form className="flex flex-col gap-5 w-full max-w-md mx-auto">
            <div className="flex flex-col gap-1">
              <label className="text-[#3B5D46] text-sm font-semibold" htmlFor="nome">Nome</label>
              <input
                id="nome"
                className="rounded border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#3B5D46]"
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            

            <div className="flex flex-col gap-1">
              <label className="text-[#3B5D46] text-sm font-semibold" htmlFor="email">Email</label>
              <input
                id="email"
                className="rounded border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#3B5D46]"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Roberttoalves@gmail.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#3B5D46] text-sm font-semibold" htmlFor="senha">Senha</label>
              <div className="relative">
                <input
                  id="senha"
                  className="rounded border border-gray-300 px-4 py-2 bg-white text-black w-full focus:outline-none focus:ring-2 focus:ring-[#3B5D46]"
                  type="password"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="********"
                />
                <span className="absolute right-3 top-3 text-gray-400 cursor-pointer select-none">
                  <FaEye/>
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <button
                type="button"
                className="flex-1 border-2 border-[#179B5C] text-[#179B5C] py-2 rounded font-semibold hover:bg-[#e6f4ed] transition"
                onClick={() => router.push("/login")}
              >
                Voltar para Login
              </button>
              <button
                type="button"
                className="flex-1 bg-[#179B5C] text-white py-2 rounded font-semibold hover:bg-[#127a48] transition"
                onClick={() => router.push("/")}
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