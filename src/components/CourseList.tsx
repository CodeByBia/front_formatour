"use client";
import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "../services/courseService";

interface CourseListProps {
  courses: Course[];
  title: string;
}

export default function CourseList({ courses, title }: CourseListProps) {
  return (
    <section className="mb-8">
      <h2 className="font-bold text-lg mb-4 text-black">{title}</h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">Nenhum curso disponível.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              image={course.image || ""}
              title={course.title}
              category={course.category || ""}
            />
          ))}
        </div>
      )}
    </section>
  );
}