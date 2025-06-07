// src/components/CourseActions.tsx
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
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm flex items-center justify-center"
      onClick={onUnenroll}
    >
      Desinscrever
    </button>
  ) : (
    <button
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center justify-center"
      onClick={onEnroll}
    >
      Inscrever-se
    </button>
  );
}
