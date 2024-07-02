import React from 'react';
import { Task } from '../interfaces/Task';
import styles from '../styles/TaskList.module.css';

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => (
  <ul className={styles.list}>
    {tasks.map((task) => (
      <li key={task.id} className={styles.item}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{task.dueDate}</p>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id!)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default TaskList;
