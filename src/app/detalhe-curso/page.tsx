// File: src/app/detalhe-curso/page.tsx

"use client";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// colocar o caminho correto do serviço de cursos
const details = {
  title: "Introdução ao Turismo Cultural no Brasil",
  description:
    "Os participantes aprenderão sobre a importância da valorização da cultura local, técnicas de mediação cultural, e como oferecer experiências autênticas para visitantes. Ideal para quem atua como guia turístico, agente de turismo ou profissional de eventos culturais.",
  infos: [
    { icon: "flag", color: "bg-red-100 text-red-700", label: "8 Horas" },
    { icon: "assignment", color: "bg-blue-100 text-blue-700", label: "Exercícios ao final das aulas" },
    { icon: "category", color: "bg-yellow-100 text-yellow-700", label: "Turismo e Cultura" },
    { icon: "event", color: "bg-green-100 text-green-700", label: "Data de início: 15/05/2025" },
    { icon: "link", color: "bg-blue-100 text-blue-700", label: "Material de apoio: Link" },
  ],
  image: "/file.svg", // Substitua pelo caminho correto da imagem do curso
  teacher: {
    name: "Vako Shvili",
    desc: "Complete Web Design: from Figma to Webflow to Freelancing",
    avatar: "/file.svg", // Substitua pelo caminho correto do avatar
  },
};

export default function DetalheCurso() {
  const [aulaChecked, setAulaChecked] = useState(false);
  // const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const courseId = Array.isArray(params?.id) ? params.id[0] : params?.id || ""; // objectId do curso
  const router = useRouter();

  useEffect(() => {
    async function fetchEnrollmentId() {
      if (!courseId) return;
      // Busca direta no Parse
      const Parse = (await import('parse')).default;
      const Enrollment = Parse.Object.extend('Enrollment');
      const query = new Parse.Query(Enrollment);
      query.equalTo('course', { __type: 'Pointer', className: 'Course', objectId: courseId });
      query.equalTo('user', { __type: 'Pointer', className: '_User', objectId: 'ID_DO_USUARIO_FIXO' });
      try {
        const enrollment = await query.first();
        if (!enrollment) {
          alert('Nenhuma inscrição encontrada para este curso.');
          // setEnrolled(false);
          return;
        }
        // setEnrolled(true);
      } catch (err) {
        alert('Erro ao buscar inscrição: ' + (err instanceof Error ? err.message : JSON.stringify(err)));
        // setEnrolled(false);
      }
    }
    fetchEnrollmentId();
  }, [courseId]);

  // async function handleEnroll() {
  //   setLoading(true);
  //   await courseService.enroll(courseId);
  //   // setEnrolled(true);
  //   setLoading(false);
  // }

  async function handleFinalizar() {
    if (!courseId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/courses`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objectId: courseId, progresso: "finalizado" })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
      }
      alert("Parabéns! Você concluiu o curso.");
      router.push("/");
    } catch (err) {
      console.error("Erro ao finalizar curso:", err);
      alert("Erro ao finalizar curso: " + (err instanceof Error ? err.message : JSON.stringify(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#eae5e0]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName="Paula" />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-8">
            <div className="h-8 rounded-t-xl mb-6 bg-gradient-to-r from-green-800 to-green-300" />
            <h2 className="text-2xl font-bold text-center mb-2 text-black">{details.title}</h2>
            <p className="text-center text-gray-700 mb-8">{details.description}</p>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex flex-col gap-3 w-full md:w-1/2">
                {details.infos.map((info, i) => (
                  <div key={i} className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-50">
                    <span className={`material-icons ${info.color}`}>{info.icon}</span>
                    <span className="text-sm text-black">{info.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center w-full md:w-1/2">
                <img src={details.image} alt="Curso" className="rounded-lg w-56 h-40 object-cover mb-2" />
                <div className="text-center text-xs text-gray-700 mt-2">
                  Essa é a sua primeira aula <b className="text-black">{details.teacher.name}</b>!<br />
                  {details.teacher.desc}
                </div>
                <div className="mt-6 flex flex-col items-center gap-4">
                  <label className="flex items-center gap-2 text-black">
                    <input
                      type="checkbox"
                      checked={aulaChecked}
                      onChange={e => setAulaChecked(e.target.checked)}
                      className="accent-green-600 w-5 h-5"
                    />
                    Aula
                  </label>
                  <button
                    className={`px-8 py-2 rounded text-white font-semibold text-lg ${aulaChecked ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!aulaChecked || loading}
                    onClick={handleFinalizar}
                  >
                    Finalizar Curso
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}