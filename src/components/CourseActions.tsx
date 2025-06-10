
"use client";
import React from "react";

interface CourseActionsProps {
  enrolled: boolean;
  onEnroll: () => void;
  onUnenroll: () => void;
}

export default function CourseActions({ enrolled, onEnroll, onUnenroll }: CourseActionsProps) {
  return enrolled ? (
    <button
      className="mt-4 ml-47 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm flex items-center justify-center"
      onClick={onUnenroll}
    >
      Desinscrever-se
    </button>
  ) : (
    <button
      className="mt-1 ml-47 px-4 py-2 bg-lime-800 text-white rounded-lg hover:bg-lime-700 transition text-sm flex items-center justify-center"
      onClick={onEnroll}
    >
      Inscrever-se
    </button>
  );
}
