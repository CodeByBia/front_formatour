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
<<<<<<< HEAD
  async listCourses(): Promise<Course[]> {
    const res = await fetch("/api/courses", { method: "GET" });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro ao buscar cursos:", res.status, errorText);
      return [];
    }
    const courses: Course[] = await res.json();
    const enrollmentsRes = await fetch("/api/enrollments", { method: "GET" });
    if (!enrollmentsRes.ok) {
      console.error(
        "Erro ao buscar enrollments:",
        enrollmentsRes.status,
        await enrollmentsRes.text()
      );
      return courses.map((c) => ({ ...c, enrolled: false }));
    }
    const enrolledCourseIds: string[] = await enrollmentsRes.json();
    return courses.map((c) => ({
      ...c,
      enrolled:
        Array.isArray(enrolledCourseIds) && enrolledCourseIds.includes(c.id),
=======
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
>>>>>>> 5fb4ee7ecac56a280ca4ddfd8b57c5176ff87751
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
