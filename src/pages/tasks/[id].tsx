import React from 'react';
import { GetServerSideProps } from 'next';
import TaskDetails from '../../components/TaskDetails';
import { Task } from '../../interfaces/Task';
import api from '../../utils/api';

type TaskPageProps = {
  task: Task;
};

const TaskPage: React.FC<TaskPageProps> = ({ task }) => {
  return (
    <div>
      <TaskDetails task={task} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await api.get(`/${id}`);
  return { props: { task: response.data } };
};

export default TaskPage;
