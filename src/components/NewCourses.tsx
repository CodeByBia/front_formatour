// NewCourses.tsx

"use client";
import React from "react";
// import CourseCard from "./CourseCard";
import CourseActions from "./CourseActions";
import { Course } from "../services/courseService";
import CourseList from "../components/CourseList";


interface NewCoursesProps {
  courses: Course[];
  onEnroll?: (courseId: string) => void;
}

export default function NewCourses({ courses, onEnroll }: NewCoursesProps) {
  return (
    <section>
      <h2 className="font-bold text-lg mb-4 text-black"></h2>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Todos os Cursos</h1>
        <CourseList
          courses={courses}
          title="Lista de Cursos Disponíveis"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <div key={course.id || idx}>
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
      </div>
    </section>
  );
}
