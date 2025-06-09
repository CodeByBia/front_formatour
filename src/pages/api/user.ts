import type { NextApiRequest, NextApiResponse } from 'next';
import Parse from '../../services/parseSetup';

const FIXED_USER_ID = 'a6qorV92Fw'; // Troque pelo objectId real do usuário fixo

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const User = Parse.Object.extend('Users');
      const query = new Parse.Query(User);
      const user = await query.get(FIXED_USER_ID);
      res.status(200).json({
        id: user.id,
        name: user.get('name'),
        email: user.get('email'),
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário', details: error instanceof Error ? error.message : error });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, email } = req.body;
      const User = Parse.Object.extend('Users');
      const query = new Parse.Query(User);
      const user = await query.get(FIXED_USER_ID);
      if (name) user.set('name', name);
      if (email) user.set('email', email);
      await user.save();
      res.status(200).json({
        id: user.id,
        name: user.get('name'),
        email: user.get('email'),
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário', details: error instanceof Error ? error.message : error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}