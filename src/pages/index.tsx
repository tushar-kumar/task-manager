import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { Task } from '../interfaces/Task';
import api from '../utils/api';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    setModalIsOpen(false);
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Task Manager</h1>
      <TaskForm onSave={handleSave} />
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />

      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Task"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Edit Task</h2>
        <TaskForm task={editingTask!} onSave={handleSave} />
        <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Close</button>
      </Modal>
      <a href="https://github.com/tushar-kumar/task-manager" className="github-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.82-2.14-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        GitHub Repo
      </a>
    </div>
  );
};

export default HomePage;
