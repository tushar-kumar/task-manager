import React from 'react';
import { Task } from '../interfaces/Task';

type TaskDetailsProps = {
  task: Task;
};

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => (
  <div>
    <h2>{task.title}</h2>
    <p>{task.description}</p>
    <p>{task.dueDate}</p>
  </div>
);

export default TaskDetails;
