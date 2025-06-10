"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { enrollmentService } from "../../services/enrollmentService";
import { FaRegClock, FaClipboardCheck, FaMapMarkedAlt, FaCalendarAlt, FaCalendarCheck, FaCertificate } from "react-icons/fa";

const details = {
  title: "Introdução ao Turismo Cultural no Brasil",
  description:
    "Os participantes aprenderão sobre a importância da valorização da cultura local, técnicas de mediação cultural, e como oferecer experiências autênticas para visitantes. Ideal para quem atua como guia turístico, agente de turismo ou profissional de eventos culturais.",
  infos: [
    { icon: <FaRegClock className="text-red-600" />, color: "bg-[#eae5e0]", label: "8 Horas" },
    { icon: <FaClipboardCheck className="text-blue-600" />, color: "bg-[#eae5e0]", label: "Exercícios ao final das aulas" },
    { icon: <FaMapMarkedAlt className="text-yellow-600" />, color: "bg-[#eae5e0]", label: "Turismo e Cultura" },
    { icon: <FaCalendarAlt className="text-green-600" />, color: "bg-[#eae5e0]", label: "Data de início: 15/05/2025" },
    { icon: <FaCalendarCheck className="text-purple-600" />, color: "bg-[#eae5e0]", label: "Data de término: 15/06/2025" },
    { icon: <FaCertificate className="text-pink-600" />, color: "bg-[#eae5e0]", label: "Certificado de conclusão" },
  ],
  image: "/course_aula.jpeg", 
  teacher: {
    name: "Rodrigo Alves",
    desc: "",
  },
};

export default function ClientOnlyDetalheCurso() {
  const [aulaChecked, setAulaChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const enrollmentId = searchParams?.get("id") || "";
  const router = useRouter();

  useEffect(() => {
    async function fetchEnrollmentId() {
      // Se quiser buscar dados da inscrição, use enrollmentId
    }
    fetchEnrollmentId();
  }, [enrollmentId]);

  async function handleFinalizar() {
    if (!enrollmentId) return;
    setLoading(true);
    try {
      await enrollmentService.updateProgresso(enrollmentId, "finalizado");
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
    <main className="flex-1 flex flex-col items-center justify-start p-0">
      {/* Título e subtítulo centralizados */}
      <div className="w-full flex flex-col items-start mt-10 mb-2 pl-80">
        <span className="text-base text-gray-500 mb-1">Aqui você pode gerenciar suas informações.</span>
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-4" style={{letterSpacing: 0.5}}>Esta é sua sala de aula</h1>
      </div>
      {/* Card principal ampliado e centralizado */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-0 overflow-hidden flex flex-col items-center justify-center" style={{minHeight: 0}}>
        {/* Gradiente superior de ponta a ponta */}
        <div className="h-20 rounded-t-xl bg-gradient-to-r from-lime-100 to-lime-950 w-full" />
        <div className="p-12 flex flex-col items-center w-full">
          <h2 className="text-3xl font-bold text-center mb-2 text-black">{details.title}</h2>
          <p className="text-center text-gray-700 mb-8 text-base max-w-2xl mx-auto">{details.description}</p>
          <div className="flex flex-row items-start gap-10 w-full justify-center">
            {/* Labels esquerda */}
            <div className="flex flex-col gap-3 w-80 max-w-xs">
              {details.infos.map((info, i) => (
                <div key={i} className="flex items-center gap-2 border border-black rounded px-3 py-2 bg-[#eae5e0] shadow-sm">
                  {info.icon}
                  <span className="text-sm text-black font-medium">{info.label}</span>
                </div>
              ))}
            </div>
            {/* Imagem e professor ao centro */}
            <div className="flex flex-col items-center w-[420px]">
              <img src={details.image} alt="Curso" className="rounded-lg w-[420px] h-[220px] object-cover mb-3 border border-black" style={{ borderWidth: '1.5px' }} />
              <div className="text-center text-xs text-gray-700 mb-3">
                Esta é sua primeira aula com <b className="text-black">{details.teacher.name}</b>!<br />
                {details.teacher.desc}
              </div>
              <label className="flex items-center gap-2 text-black text-xs mb-2">
                <input
                  type="checkbox"
                  checked={aulaChecked}
                  onChange={e => setAulaChecked(e.target.checked)}
                  className="accent-green-600 w-4 h-4"
                />
                Marcar aula como concluída
              </label>
              <button
                className={`px-8 py-2 rounded text-white font-semibold text-lg mt-1 ${aulaChecked ? "bg-green-700 hover:bg-green-800" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!aulaChecked || loading}
                onClick={handleFinalizar}
              >
                {loading ? "Finalizando..." : "Finalizar Curso"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
