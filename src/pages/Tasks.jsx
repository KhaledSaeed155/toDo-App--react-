import React, { useState } from 'react'
import TasksComponent from '../components/TasksComponent'

const Tasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Tasks</h1>
      <TasksComponent tasks={tasks} setTasks={setTasks} />
    </div>
  )
}

export default Tasks