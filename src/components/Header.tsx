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
       {/*<FaRegUserCircle size={30} color="#619141" /> */}
      </div>
    </header>
  );
}
