import type { NextApiRequest, NextApiResponse } from 'next';
import Parse from '../../services/parseSetup';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const Course = Parse.Object.extend('Course');
    const query = new Parse.Query(Course);
    const results = await query.find();
    type CourseType = Parse.Object & {
      id: string;
      get: <T extends keyof { title: string; description: string; image: string; category: string }>(key: T) => string;
    };
    const courses = results.map((c: CourseType) => ({
      id: c.id,
      title: c.get('title'),
      description: c.get('description'),
      image: c.get('image'),
      category: c.get('category'),
    }));
    res.status(200).json(courses);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
