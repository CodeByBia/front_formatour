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
  async listCourses(): Promise<Course[]> {
    const res = await fetch('/api/courses', { method: 'GET' });
    if (!res.ok) {
      console.error('Erro ao buscar cursos:', res.status, await res.text());
      return [];
    }
    const courses: Course[] = await res.json();
    const enrollmentsRes = await fetch('/api/enrollments', { method: 'GET' });
    if (!enrollmentsRes.ok) {
      console.error('Erro ao buscar enrollments:', enrollmentsRes.status, await enrollmentsRes.text());
      return courses.map((c) => ({ ...c, enrolled: false }));
    }
    const enrolledCourseIds: string[] = await enrollmentsRes.json();
    return courses.map((c) => ({
      ...c,
      enrolled: Array.isArray(enrolledCourseIds) && enrolledCourseIds.includes(c.id),
    }));
  },
  async enroll(courseId: string): Promise<boolean> {
    const res = await fetch('/api/enrollments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Erro ao inscrever:', res.status, err);
      throw new Error('Erro ao inscrever: ' + err);
    }
    return true;
  },
  async unenroll(courseId: string): Promise<boolean> {
    const res = await fetch('/api/enrollments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Erro ao desinscrever:', res.status, err);
      throw new Error('Erro ao desinscrever: ' + err);
    }
    return true;
  },
};
