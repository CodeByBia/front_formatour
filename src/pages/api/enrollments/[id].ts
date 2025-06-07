import type { NextApiRequest, NextApiResponse } from 'next';
import Parse from '../../../services/parseSetup';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'enrollmentId inválido' });
  }

  if (req.method === 'PUT') {
    try {
      const Enrollment = Parse.Object.extend('Enrollment');
      const query = new Parse.Query(Enrollment);
      const enrollment = await query.get(id);
      const { aula1, progresso } = req.body;
      if (typeof aula1 === 'boolean') enrollment.set('aula1', aula1);
      if (typeof progresso === 'string') enrollment.set('progresso', progresso);
      await enrollment.save();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar enrollment', details: error instanceof Error ? error.message : error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}