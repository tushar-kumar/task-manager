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
    </div>
  );
};

export default HomePage;
