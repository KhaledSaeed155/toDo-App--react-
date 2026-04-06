import React, { useState } from 'react'

const TasksComponent = ({ tasks, setTasks }) => {
    const [showCompleted, setShowCompleted] = useState(false);
    // 1. State لإدارة الـ Modal والمهمة المختارة
    const [selectedTask, setSelectedTask] = useState(null);

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const handleComplete = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, isComplete: !task.isComplete } : task
        );
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    // 2. Function لفتح الـ Modal وتحديد المهمة
    const taskDetails = (task) => {
        setSelectedTask(task);
    };

    const filteredTasks = showCompleted
        ? tasks.filter(task => task.isComplete)
        : tasks.filter(task => !task.isComplete);

    return (
        <div className="w-full">
            {/* Header section... (نفس الكود الخاص بك) */}
            <div className="from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-6 border border-blue-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {showCompleted ? 'Completed Tasks' : 'Active Tasks'}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} {showCompleted ? 'completed' : 'in progress'}
                        </p>
                    </div>
                    <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-600">
                        <button
                            onClick={() => setShowCompleted(false)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${!showCompleted ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setShowCompleted(true)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${showCompleted ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            Completed
                        </button>
                    </div>
                </div>
            </div>

            {/* Task list */}
            <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No tasks found</h3>
                    </div>
                ) : (
                    filteredTasks.map((task, index) => (
                        <div 
                            key={index} 
                            // lma ados 3la el task ab3at el task 
                            onClick={() => taskDetails(task)}
                            className={`group cursor-pointer bg-white dark:bg-gray-800 rounded-xl border transition-all duration-200 hover:shadow-lg ${task.isComplete ? 'border-green-200' : 'border-gray-200 hover:border-blue-300'}`}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-lg font-semibold ${task.isComplete ? 'text-green-700 line-through' : 'text-gray-900 dark:text-white'}`}>
                                            {task.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // 3sham mfta7sh modal lma a3ml check
                                                handleComplete(tasks.indexOf(task));
                                            }}
                                            className={`p-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                                                task.isComplete
                                                    ? 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400 shadow-sm'
                                                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 shadow-sm'
                                            }`}
                                            title={task.isComplete ? 'Mark as incomplete' : 'Mark as complete'}
                                        >
                                            {task.isComplete ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6 6" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // 3sham mfta7sh modal lma a3ml delete
                                                deleteTask(tasks.indexOf(task));
                                            }}
                                            className="p-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/*  Modal UI */}
            {selectedTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Task Details</h3>
                                <button 
                                    onClick={() => setSelectedTask(null)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">Title</label>
                                    <p className="text-lg text-gray-900 dark:text-gray-100 font-medium">{selectedTask.title}</p>
                                </div>
                                
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">Description</label>
                                    <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg mt-1 italic">
                                        {selectedTask.description || "No description provided."}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedTask.isComplete ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {selectedTask.isComplete ? 'Completed' : 'Active'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 flex justify-end">
                            <button 
                                onClick={() => setSelectedTask(null)}
                                className="px-6 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TasksComponent;