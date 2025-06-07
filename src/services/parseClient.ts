// src/services/parseClient.ts
// Serviço para inicializar e exportar o cliente Parse (mock/fake por enquanto)

// Troque o mock pelo Parse real
import Parse from './parseSetup';

export const parseClient = {
  // Métodos simulados para integração futura com Back4App
  get: async (url: string, params?: Record<string, unknown>) => {
    if (url === '/classes/Course') {
      const Course = Parse.Object.extend('Course');
      const query = new Parse.Query(Course);
      const results = await query.find();
      return { data: { results } };
    }
    if (url === '/classes/Enrollment') {
      const Enrollment = Parse.Object.extend('Enrollment');
      const query = new Parse.Query(Enrollment);
      if (params?.userId) {
        query.equalTo('users', {
          __type: 'Pointer',
          className: 'Users',
          objectId: params.userId,
        });
      }
      const results = await query.find();
      return { data: { results } };
    }
    return { data: null };
  },
  post: async (url: string, body: Record<string, unknown>) => {
    if (url.startsWith('/enroll/')) {
      const courseId = url.split('/').pop();
      const Enrollment = Parse.Object.extend('Enrollment');
      const enrollment = new Enrollment();
      enrollment.set('users', { __type: 'Pointer', className: 'Users', objectId: body.userId });
      enrollment.set('course', { __type: 'Pointer', className: 'Course', objectId: courseId });
      await enrollment.save();
      return { data: { success: true } };
    }
    return { data: null };
  },
  put: async (url: string, body: Record<string, unknown>) => {
    // Exemplo: atualizar usuário
    if (url === '/users/me') {
      // Implemente lógica para atualizar usuário logado
      return { data: { success: true } };
    }
    return { data: null };
  },
  delete: async (url: string, body?: Record<string, unknown>) => {
    if (url.startsWith('/unenroll/')) {
      const courseId = url.split('/').pop();
      const Enrollment = Parse.Object.extend('Enrollment');
      const query = new Parse.Query(Enrollment);
      if (!body || !body.userId) throw new Error('userId não fornecido');
      query.equalTo('users', { __type: 'Pointer', className: 'Users', objectId: body.userId });
      query.equalTo('course', { __type: 'Pointer', className: 'Course', objectId: courseId });
      const results = await query.find();
      for (const enrollment of results) {
        await enrollment.destroy();
      }
      return { data: { success: true } };
    }
    return { data: null };
  },
};
