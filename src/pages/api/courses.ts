// Localização: pages/api/courses.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import Parse from '../../services/parseSetup'; // Ajuste o caminho se necessário

// Função auxiliar para criar um "slug" amigável para URLs
function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-') // Substitui espaços por -
    .replace(/[^\w-]+/g, '') // Remove caracteres inválidos
    .replace(/--+/g, '-'); // Substitui múltiplos - por um único -
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query; 

  const Course = Parse.Object.extend('Course');
  const query = new Parse.Query(Course);

  try {
    if (id) {
      // A busca por ID continua a mesma para a página de detalhes
      const course = await query.get(id as string);
      const response = {
        id: course.id,
        title: course.get('title'),
        description: course.get('description'),
        category: course.get('category'),
        image: course.get('image')?.url(),
      };
      res.status(200).json(response);

    } else {
      // --- BUSCAR TODOS OS CURSOS (COM CAMINHO ADICIONADO) ---
      query.select("title", "description", "category", "image", "progresso");
      const results = await query.find();

      const courses = results.map((c) => {
        const title = c.get('title') || '';
        return {
          id: c.id,
          title: title,
          description: c.get('description'),
          image: c.get('image')?.url(),
          category: c.get('category'),
          progresso: c.get('progresso') || 0,
          // AQUI ESTÁ A MUDANÇA: Criamos um caminho estático para cada curso
          path: `/detalhe-curso/${slugify(title)}`
        };
      });

      res.status(200).json(courses);
    }
  } catch (error: unknown) {
    // ... (bloco de erro sem alterações)
    const typedError = error as { code?: number; message?: string };
    if (typedError.code === Parse.Error.OBJECT_NOT_FOUND) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }
    console.error('Parse API Error:', error);
    res.status(500).json({ error: 'Falha ao buscar dados do curso.', details: typedError.message });
  }
}
