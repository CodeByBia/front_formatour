import React from 'react';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  image: string;
  title: string;
  category: string;
  progress?: number;
}

export default function CourseCard({ image, title, category, progress }: Omit<CourseCardProps, 'onView'>) {
  const router = useRouter();
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

        {/* deveria estar em inscrição */}
        {progress !== undefined ? (
          <div className="flex items-center mt-2">
            <input type="range" value={progress} readOnly className="flex-1 accent-green-500" />
            <span className="ml-2 text-xs text-black">{progress}%</span>
          </div>
        ) : null}
        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm flex items-center justify-center"
          onClick={() => router.push('/detalhe-curso')}
        >
          Ver <span className="material-icons ml-1 text-base">Ver</span>
        </button>
      </div>
    </div>
  );
}
