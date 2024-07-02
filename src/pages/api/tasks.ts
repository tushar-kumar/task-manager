import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../interfaces/Task';

let tasks: Task[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id, title, description, dueDate } = req.body;

  switch (method) {
    case 'GET':
      res.status(200).json(tasks);
      break;
    case 'POST':
      const newTask: Task = { id: uuidv4(), title, description, dueDate };
      tasks.push(newTask);
      res.status(201).json(newTask);
      break;
    case 'PUT':
      tasks = tasks.map(task => (task.id === id ? { id, title, description, dueDate } : task));
      res.status(200).json({ id, title, description, dueDate });
      break;
    case 'DELETE':
      tasks = tasks.filter(task => task.id !== id);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
