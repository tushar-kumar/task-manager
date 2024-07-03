import React from 'react';
import { Task } from '../interfaces/Task';

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => (
  <ul>
    {tasks.map((task) => (
      <li key={task.id} className="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
        <h3 className="text-xl font-semibold">{task.title}</h3>
        <p className="text-gray-700">{task.description}</p>
        <p className="text-gray-500">{task.dueDate}</p>
        <button 
          onClick={() => onEdit(task)} 
          className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task.id!)} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default TaskList;
