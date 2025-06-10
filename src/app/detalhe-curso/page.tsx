"use client";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import dynamic from "next/dynamic";
// @ts-expect-error Next.js dynamic import with .jsx extension
const ClientOnlyDetalheCurso = dynamic(() => import("./ClientOnlyDetalheCurso.jsx"), { ssr: false }) as React.ComponentType;

export default function DetalheCurso() {
  "use client";
  return (
    <div className="min-h-screen flex bg-[#eae5e0]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName="Paula" />
        <ClientOnlyDetalheCurso />
      </div>
    </div>
  );
}