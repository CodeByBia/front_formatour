// 1. CourseCard.tsx - Componente do Card do Curso
// O código foi reescrito para remover as dependências do Next.js e garantir a compatibilidade.

"use client";

import React from "react";


interface CourseCardProps {
  id: string;
  image: string;
  title: string;
  category: string;
  enrollmentId?: string;
}

export default function CourseCard({
  id,
  image,
  title,
  category,
  enrollmentId,
}: Omit<CourseCardProps, "onView">) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-gray-200">
      <img src={image} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-base mb-1 line-clamp-2">{title}</h3>
          <div className="text-xs text-black flex items-center mb-2">
            <span className="material-icons text-sm mr-1"></span>
            {category}
          </div>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="range"
            value={1}
            min={0}
            max={100}
            readOnly
            className="flex-1 accent-lime-600"
          />
          <span className="ml-2 text-xs text-black">1%</span>
        </div>
        <a
          href={`/detalhe-curso?id=${enrollmentId ?? id}`}
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition text-sm flex items-center justify-center"
        >
          <span className="ml-1 text-bold">Ver</span>
        </a>
      </div>
    </div>
  );
}
