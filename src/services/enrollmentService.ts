// src/services/enrollmentService.ts
export interface Enrollment {
  id: string;
  course: { id: string; objectId?: string };
  progresso?: string;
}

export const enrollmentService = {

  async updateProgresso(enrollmentId: string, progresso: string): Promise<void> {
    await fetch(`/api/enrollments/${enrollmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progresso }),
    });
  },
};