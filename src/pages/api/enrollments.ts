import type { NextApiRequest, NextApiResponse } from 'next';
import Parse from '../../services/parseSetup';

const FIXED_USER_ID = 'a6qorV92Fw'; // Troque pelo objectId real do usuário fixo

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const Enrollment = Parse.Object.extend('Enrollment');
    const query = new Parse.Query(Enrollment);
    query.equalTo('users', { __type: 'Pointer', className: 'Users', objectId: FIXED_USER_ID });
    const results = await query.find();
    const enrolledCourses = results.map((e: Parse.Object) => ({
      courseId: e.get('course')?.id,
      enrollmentId: e.id
    })).filter(e => e.courseId);
    res.status(200).json(enrolledCourses);
  } else if (req.method === 'POST') {
    try {
      const { courseId } = req.body;
      if (!courseId || typeof courseId !== 'string') {
        return res.status(400).json({ error: 'courseId inválido' });
      }
      const Enrollment = Parse.Object.extend('Enrollment');
      const enrollment = new Enrollment();
      enrollment.set('users', { __type: 'Pointer', className: 'Users', objectId: FIXED_USER_ID });
      enrollment.set('course', { __type: 'Pointer', className: 'Course', objectId: courseId });
      await enrollment.save();
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao inscrever', details: error instanceof Error ? error.message : error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { courseId } = req.body;
      if (!courseId || typeof courseId !== 'string') {
        return res.status(400).json({ error: 'courseId inválido' });
      }
      const Enrollment = Parse.Object.extend('Enrollment');
      const query = new Parse.Query(Enrollment);
      query.equalTo('users', { __type: 'Pointer', className: 'Users', objectId: FIXED_USER_ID });
      query.equalTo('course', { __type: 'Pointer', className: 'Course', objectId: courseId });
      const results = await query.find();
      for (const enrollment of results) {
        await enrollment.destroy();
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao desinscrever', details: error instanceof Error ? error.message : error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
