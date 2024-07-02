import React, { useState } from 'react';
import { Task } from '../interfaces/Task';
import api from '../utils/api';
import styles from '../styles/Home.module.css';

type TaskFormProps = {
  task?: Task;
  onSave: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      await api.put('', { id: task.id, title, description, dueDate });
    } else {
      await api.post('', { title, description, dueDate });
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
