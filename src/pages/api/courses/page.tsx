// Localização: app/cursos/page.tsx
// O código foi atualizado para corrigir o aviso de 'any' do linter,
// adicionando uma tipagem mais específica para o objeto Parse.

"use client";

import React, { useEffect, useState } from 'react';

// --- DEFINIÇÕES E COMPONENTES INTERNOS ---

// Simulação (Mock) do objeto Parse para resolver o erro de importação
const Parse = {
    Object: {
        extend: (className: string) => {
            return class {
                className: string;
                constructor() {
                    this.className = className;
                }
            };
        }
    },
    Query: class {
        _className: string;
        _selectedKeys: string[] = [];

        constructor(objectClass: new () => { className: string }) {
             this._className = new objectClass().className;
        }

        select(...keys: string[]) {
            this._selectedKeys = keys;
        }

        async find() {
            console.log(`Buscando dados simulados para a classe: ${this._className}`);
            const mockDataFromParse = [
                { id: 'amd4WGNTlx', get: (key: string) => ({ title: 'História da Arte Brasileira', description: 'Um panorama sobre o...', category: 'Arte', progresso: 30, image: { url: () => 'https://placehold.co/600x400/7d3a0c/FFFFFF?text=Arte' } }[key]) },
                { id: 'rEbrDAl32', get: (key: string) => ({ title: 'Comunicação para Guias', description: 'Técnicas de comunicação...', category: 'Comunicação', progresso: 80, image: { url: () => 'https://placehold.co/600x400/0c7d3a/FFFFFF?text=Comunicação' } }[key]) },
                { id: 'GNVzZY4DSB', get: (key: string) => ({ title: 'Introdução ao Turismo Cultural', description: 'Aprenda os fundamentos...', category: 'Turismo', progresso: 10, image: { url: () => 'https://placehold.co/600x400/3a0c7d/FFFFFF?text=Turismo' } }[key]) },
            ];
            return Promise.resolve(mockDataFromParse);
        }
    }
};

// Interface para o tipo de dados do Curso (formato final)
interface Course {
  id: string;
  title: string;
  image?: string;
  category?: string;
  progresso?: number;
}

// Interface para o objeto retornado pela query do Parse
interface ParseCourseObject {
    id: string;
    get: (key: 'title' | 'category' | 'progresso' | 'image' | 'description') => string | number | { url: () => string } | undefined;
}


// Componente CourseCard (colocado aqui para simplificar)
const CourseCard = ({ id, image, title, category, progresso }: Course) => {
    const isIdValid = id && id !== 'undefined';
    const courseUrl = isIdValid ? `/detalhe-curso/${id}` : '#';

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-gray-200 h-full">
            <img
                src={image || "/placeholder.svg"}
                alt={title}
                className="w-full h-32 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-base mb-1 line-clamp-2 h-12">{title}</h3>
                    <div className="text-xs text-gray-600 flex items-center mb-2">
                        <span className="material-icons text-sm mr-1">category</span>
                        {category}
                    </div>
                </div>
                {(progresso !== undefined && progresso !== null) && (
                    <div className="mt-2">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">Progresso</span>
                            <span className="text-xs font-medium text-green-600">{progresso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                           <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${progresso}% ` }}></div>
                        </div>
                    </div>
                )}
                <a href={isIdValid ? courseUrl : undefined} onClick={(e) => !isIdValid && e.preventDefault()} className={`mt-4 text-center no-underline ${!isIdValid ? 'cursor-not-allowed' : ''}`}>
                    <button disabled={!isIdValid} className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm flex items-center justify-center disabled:bg-gray-400">
                        Ver Detalhes
                    </button>
                </a>
            </div>
        </div>
    );
};

// Componentes Sidebar e Header (colocados aqui para simplificar)
const Sidebar = () => <div className="w-64 bg-gray-800 text-white p-5 hidden md:block"><h2>Menu</h2></div>;
const Header = ({ userName }: { userName: string }) => <header className="bg-white shadow-sm p-4"><h1>Bem-vinda, {userName}</h1></header>;

// --- COMPONENTE PRINCIPAL DA PÁGINA ---

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        
        const Course = Parse.Object.extend('Course');
        const query = new Parse.Query(Course);

        query.select("title", "category", "image", "progresso");
        const results = await query.find();

      // CORREÇÃO: Garantindo que os valores correspondam à interface Course
        const fetchedCourses: Course[] = results.map((c: ParseCourseObject) => {
            const rawTitle = c.get('title');
            const title = typeof rawTitle === 'string' ? rawTitle : (typeof rawTitle === 'number' ? String(rawTitle) : 'Título Indisponível');

            const rawCategory = c.get('category');
            const category = typeof rawCategory === 'string' ? rawCategory : (typeof rawCategory === 'number' ? String(rawCategory) : 'Sem Categoria');

            const rawProgresso = c.get('progresso');
            const progresso = typeof rawProgresso === 'number' ? rawProgresso : (typeof rawProgresso === 'string' ? parseInt(rawProgresso, 10) || 0 : 0);

            const rawImage = c.get('image');
            const image = rawImage && typeof rawImage === 'object' && typeof (rawImage as { url: () => string }).url === 'function'
                ? (rawImage as { url: () => string }).url()
                : undefined;

            return {
                id: c.id,
                title,
                image,
                category,
                progresso,
            };
        });
        
        setCourses(fetchedCourses);

      } catch (err) {
        setError("Não foi possível carregar os cursos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []); 

  const renderContent = () => {
    if (loading) return <p className="text-center">A carregar cursos...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (courses.length === 0) return <p className="text-center">Nenhum curso encontrado.</p>;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id} 
            title={course.title}
            category={course.category}
            image={course.image}
            progresso={course.progresso}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-[#eae5e0]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName="Paula" />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-black mb-6">Nossos Cursos</h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
