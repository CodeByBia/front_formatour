import React from 'react';

export default function Header({ userName }: { userName: string }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Procurar por um curso aqui"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="ml-6 flex items-center">
        <span className="mr-4 font-semibold text-black">Olá, {userName}</span>
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-gray-300" />
      </div>
    </header>
  );
}
