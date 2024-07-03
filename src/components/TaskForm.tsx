import React, { useState, useEffect } from 'react';
import { Task } from '../interfaces/Task';
import api from '../utils/api';

type TaskFormProps = {
  task?: Task;
  onSave: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      await api.put('', { id: task.id, title, description, dueDate });
    } else {
      await api.post('', { title, description, dueDate });
    }
    onSave();
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
