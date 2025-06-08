// src/services/parseClient.ts
// Serviço para inicializar e exportar o cliente Parse (mock/fake por enquanto)

// Troque o mock pelo Parse real
import Parse from './parseSetup';

// resolvidoo bug do body vaizo
let mockUser = {
  
  id: 1,
  name: 'Usuário Padrão',
  email: 'usuario@exemplo.com',
};

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
    console.log('Dados recebidos para atualização:', body);

    if (url === '/users/me') {
      // LÓGICA CORRIGIDA:
      // Usamos o spread operator (...) para mesclar os dados atuais do usuário (`mockUser`)
      // com os novos dados que chegaram no `body`.
      // Propriedades existentes são atualizadas e novas são adicionadas.
      mockUser = { ...mockUser, ...body };

      // RETORNO CORRIGIDO:
      // Retornamos o objeto do usuário completo e atualizado.
      // Isso é uma prática comum em APIs.
      return { data: mockUser };
    }

    // Mantém o retorno padrão para outras URLs não implementadas
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
