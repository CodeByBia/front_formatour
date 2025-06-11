// components/DebugState.tsx
"use client";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalStateStore";

export default function DebugState() {
  const courses = useSelector((state: RootState) => state.courses.courses);
  const isLoading = useSelector((state: RootState) => state.courses.isLoading);

  return (
    <div style={{ padding: "16px", background: "#f4f4f4", fontSize: "14px" }}>
      <h3>📦 Estado Global Atual</h3>
      <p><strong>isLoading:</strong> {isLoading.toString()}</p>
      <pre>{JSON.stringify(courses, null, 2)}</pre>
    </div>
  );
}