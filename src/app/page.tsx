"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import NewCourses from "../components/NewCourses";
import { courseService, Course } from "../services/courseService";
import { useLoadingStore } from "../store/useLoadingStore";

export default function Home() {
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [newCourses, setNewCourses] = useState<Course[]>([]);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      const all = await courseService.getAllCourses();
      setUserCourses(all.filter((c: Course) => c.enrolled));
      setNewCourses(all.filter((c: Course) => !c.enrolled));
      setLoading(false);
    }
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onEnroll(courseId: string) {
    setLoading(true);
    await courseService.enroll(courseId);
    const all = await courseService.getAllCourses();
    setUserCourses(all.filter((c: Course) => c.enrolled));
    setNewCourses(all.filter((c: Course) => !c.enrolled));
    setLoading(false);
  }

  async function onUnenroll(courseId: string) {
    setLoading(true);
    await courseService.unenroll(courseId);
    const all = await courseService.getAllCourses();
    setUserCourses(all.filter((c: Course) => c.enrolled));
    setNewCourses(all.filter((c: Course) => !c.enrolled));
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex bg-[#eae5e0]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName="Paula" />
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-white bg-opacity-0 backdrop-blur-sm transition-opacity" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin shadow-lg" />
              <span className="mt-3 text-green-900 font-semibold text-base drop-shadow-sm">
                Carregando...
              </span>
            </div>
          </div>
        )}
        <main className="flex-1 p-8 bg-white rounded-xl shadow-sm mt-6">
          {isLoading ? (
            <div>Carregando...</div>
          ) : (
            <>
              <Carousel
                title="Seus cursos"
                courses={userCourses}
                onUnenroll={onUnenroll}
              />
              <NewCourses courses={newCourses} onEnroll={onEnroll} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}