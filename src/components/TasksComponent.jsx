import React, { useState } from 'react'

const TasksComponent = ({ tasks, setTasks }) => {
    const [showCompleted, setShowCompleted] = useState(false);

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

    const filteredTasks = showCompleted
        ? tasks.filter(task => task.isComplete)
        : tasks.filter(task => !task.isComplete);

    return (
        <div className="w-full">
            {/* Header with toggle buttons */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-6 border border-blue-100 dark:border-gray-700">
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
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                !showCompleted
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Active
                            </span>
                        </button>
                        <button
                            onClick={() => setShowCompleted(true)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                showCompleted
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Completed
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Task list */}
            <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                            {showCompleted ? (
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            )}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {showCompleted ? 'No completed tasks yet' : 'No active tasks'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            {showCompleted 
                                ? 'Complete some tasks to see them here!' 
                                : 'Add a new task to get started!'
                            }
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task, index) => (
                        <div 
                            key={index} 
                            className={`group bg-white dark:bg-gray-800 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                                task.isComplete 
                                    ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20' 
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-lg font-semibold transition-all duration-200 ${
                                            task.isComplete 
                                                ? 'text-green-700 dark:text-green-400 line-through' 
                                                : 'text-gray-900 dark:text-white'
                                        }`}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className={`mt-2 text-sm transition-all duration-200 ${
                                                task.isComplete 
                                                    ? 'text-green-600 dark:text-green-500 line-through' 
                                                    : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                {task.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleComplete(tasks.indexOf(task))}
                                            className={`p-2 rounded-lg transition-all duration-200 ${
                                                task.isComplete
                                                    ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 dark:text-yellow-400'
                                                    : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400'
                                            }`}
                                            title={task.isComplete ? 'Mark as active' : 'Mark as complete'}
                                        >
                                            {task.isComplete ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => deleteTask(tasks.indexOf(task))}
                                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 transition-all duration-200"
                                            title="Delete task"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default TasksComponent;