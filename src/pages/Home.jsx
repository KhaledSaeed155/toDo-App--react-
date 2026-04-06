import React, { useState, useEffect } from 'react';
import TasksComponent from '../components/TasksComponent';
import Toast from '../components/Toast';

const Home = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const addTask = (e) => {
    e.preventDefault(); 
    
    if (taskTitle.trim() === '') return; 

    const newTasks = [...tasks, { title: taskTitle, description: taskDesc, isComplete: false }];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTaskTitle('');
    setTaskDesc('');
    
    // Show toast notification
    setToast({ message: 'Task added successfully!', isVisible: true });
  };

  const closeToast = () => {
    setToast({ message: '', isVisible: false });
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Home</h1>
      <form onSubmit={addTask} className="flex flex-col gap-4 mb-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <input 
          type="text" 
          placeholder="Task Title" 
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-hidden"
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-hidden"
        />
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md p-2 transition-colors"
          type="submit"
        >
          Add Task
        </button>
      </form>
     
    
      
      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        isVisible={toast.isVisible} 
        onClose={closeToast} 
      />
    </div>
  );
};

export default Home;