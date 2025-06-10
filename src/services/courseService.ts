// src/services/courseService.ts
// Serviço para CRUD de cursos

export interface Course {
  id: string;
  title: string;
  image?: string;
  category?: string;
  enrolled?: boolean;
}

export const courseService = {
async getAllCourses(): Promise<Course[]> {
    const courseResponse = await fetch('/api/courses', { method: 'GET' });
    if (!courseResponse.ok) {
      console.error('Falha ao obter lista de cursos:', courseResponse.status, await courseResponse.text());
      return [];
    }
    const courseList: Course[] = await courseResponse.json();
    const userEnrollments = await fetch('/api/enrollments', { method: 'GET' });
    if (!userEnrollments.ok) {
      console.error('Falha ao obter inscrições:', userEnrollments.status, await userEnrollments.text());
      return courseList.map((course) => ({ ...course, enrolled: false }));
    }
    const enrolledIds: string[] = await userEnrollments.json();
    return courseList.map((course) => ({
      ...course,
      enrolled: Array.isArray(enrolledIds) ? enrolledIds.includes(course.id) : false,
    }));
  },
  async enroll(courseId: string): Promise<boolean> {
    const res = await fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Erro ao inscrever:", res.status, err);
      throw new Error("Erro ao inscrever: " + err);
    }
    return true;
  },
  async unenroll(courseId: string): Promise<boolean> {
    const res = await fetch("/api/enrollments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Erro ao desinscrever:", res.status, err);
      throw new Error("Erro ao desinscrever: " + err);
    }
    return true;
  },
};
