"use client";
import React from "react";
import CourseCard from "./CourseCard";
import CourseActions from "./CourseActions";
import { Course } from "../services/courseService";

interface CarouselProps {
  title: string;
  courses: Course[];
  onUnenroll?: (courseId: string) => void;
}

export default function Carousel({ title, courses, onUnenroll }: CarouselProps) {
  const [start, setStart] = React.useState(0);
  const visible = 2;
  const canPrev = start > 0;
  const canNext = start + visible < courses.length;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-lg text-black">{title}</h2>
        <div className="flex gap-2">
          <button
            className={`rounded-full p-1 border ${canPrev ? 'bg-white' : 'bg-gray-100 text-gray-400'} `}
            onClick={() => setStart(s => Math.max(0, s - 1))}
            disabled={!canPrev}
          >
            <span className="material-icons">{'<'}</span>
          </button>
          <button
            className={`rounded-full p-1 border ${canNext ? 'bg-white' : 'bg-gray-100 text-gray-400'} `}
            onClick={() => setStart(s => Math.min(courses.length - visible, s + 1))}
            disabled={!canNext}
          >
            <span className="material-icons">{'>'}</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.slice(start, start + visible).map((course, idx) => (
          <div key={course.id || idx}>
            <CourseCard
              image={course.image || ""}
              title={course.title}
              category={course.category || ''}
            />
            {onUnenroll && course.enrolled && (
              <CourseActions
                enrolled={!!course.enrolled}
                onEnroll={() => {}}
                onUnenroll={() => onUnenroll(course.id)}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}


// crud 
// gerenciamento estado global 
// css completo 