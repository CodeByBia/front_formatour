"use client";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import Image from "next/image";

export default function PerfilPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("********");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getUser().then((user) => {
      setNome(user.name);
      setEmail(user.email);
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await userService.updateUser({ name: nome, email });
    setLoading(false);
    alert("Perfil salvo!");
  }

  function handleLogout() {
    alert("Logout realizado!");
  }

  return (
    <div className="min-h-screen flex bg-[#eae5e0]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName={nome} />
  
        <main className="flex-1 flex flex-col items-center justify-start py-15">
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <div className="w-full max-w-3xl relative">
          
              <div
                className="absolute left-0 right-0 h-20 rounded-t-xl bg-gradient-to-r from-lime-100 to-lime-950 z-10"
                style={{ top: '-40px' }}
              />
              <div className="w-full bg-white rounded-xl shadow-sm p-8 pt-14 relative z-0">
                <h2 className="text-2xl font-bold mb-1 text-black">
                  Esse é o seu Perfil
                </h2>
                <p className="text-gray-700 text-sm mb-8">
                  Aqui você pode gerenciar suas informações.
                </p>
                <form onSubmit={handleSave} className="flex flex-col gap-8">
                  <div className="flex items-center gap-6 mb-4">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-lg text-black">
                        {nome}
                      </div>
                      <div className="text-gray-500 text-sm">{email}</div>
                    </div>

                    <div className="absolute justify-end ml-150">
                      <button
                        type="submit"
                        className="bg-lime-600 text-white px-6 py-2 rounded hover:bg-emerald-950 transition focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <span className="text-white">Salvar </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-black">
                      Nome Completo
                    </label>
                    <input
                      className="rounded-md border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome Completo"
                    />
                    <label className="text-sm font-medium text-black">
                      Email
                    </label>
                    <input
                      className="rounded-md border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                    />
                    <label className="text-sm font-medium text-black">
                      Senha
                    </label>
                    <input
                      className="rounded-md border border-gray-300 px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Senha"
                      type="password"
                    />
                  </div>
                </form>

                <div className="flex items-center gap-2 mt-8">
                  <button
                    onClick={handleLogout}
                    className="bg-lime-600 rounded-full w-12 h-12 flex items-center justify-center hover:bg-emerald-950 transition focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <Image
                      priority
                      src={"logout.svg"}
                      height={20}
                      width={20}
                      alt="botão de logout"
                      color="white"
                    />
                  </button>
                  <p> asdas</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}