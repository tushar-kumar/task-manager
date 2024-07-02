import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../interfaces/Task';
import api from '../utils/api';
import styles from '../styles/Home.module.css';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await api.get('');
    setTasks(response.data);
  };

  const handleDelete = async (id: string) => {
    await api.delete('', { data: { id } });
    fetchTasks();
  };

  const handleSave = () => {
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div className={styles.container}>
      <h1>Task Management</h1>
      <TaskForm task={editingTask} onSave={handleSave} />
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={setEditingTask} />
    </div>
  );
};

export default HomePage;
