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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <div key={course.id || idx}>
            <CourseCard
              image={course.image}
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
    </section>
  );
}
