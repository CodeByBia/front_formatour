"use client";
import React from "react";
import CourseCard from "./CourseCard";
import CourseActions from "./CourseActions";
import { Course } from "../services/courseService";


interface NewCoursesProps {
  courses: Course[];
  onEnroll?: (courseId: string) => void;
}

export default function NewCourses({ courses, onEnroll }: NewCoursesProps) {
  return (
    <section>
      <h2 className="font-bold text-lg mb-4 text-black">Novos Cursos</h2>
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 w-full">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Nenhum curso disponível</h3>
          <p className="text-base text-gray-500 mb-2">No momento não há cursos novos para você.</p>
          <span className="text-sm text-gray-400">Volte em breve para ver novidades!</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <div key={course.id || idx}>
              <CourseCard
                id={course.id}
                image={course.image || ""}
                title={course.title}
                category={course.category || ""}
              />
              {onEnroll && !course.enrolled && (
                <CourseActions
                  enrolled={!!course.enrolled}
                  onEnroll={() => onEnroll(course.id)}
                  onUnenroll={() => {}}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
