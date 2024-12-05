import '../styles/App.css';
import StatusLine from './StatusLine.jsx';
import { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  const addEmptyTask = (status) => {
    const lastTask = tasks[tasks.length - 1];
    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: '',
        description: '',
        urgency: '',
        status: status,
        isCollapsed: true,
        isCompleted: false,
        dueDate: '',
      },
    ]);
  };

  const addTask = (taskToAdd) => {
    let filteredTasks = tasks.filter((task) => task.id !== taskToAdd.id);
    let newTaskList = [...filteredTasks, taskToAdd];
    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  };

  const deleteTask = (taskId) => {
    let filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
    saveTasksToLocalStorage(filteredTasks);
  };

  const moveTask = (id, newStatus) => {
    let task = tasks.find((task) => task.id === id);
    let filteredTasks = tasks.filter((task) => task.id !== id);

    let updatedTask = { ...task, status: newStatus };
    let newTaskList = [...filteredTasks, updatedTask];

    setTasks(newTaskList);
    saveTasksToLocalStorage(newTaskList);
  };

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    let loadedTasks = localStorage.getItem('tasks');
    let tasks = JSON.parse(loadedTasks);
    if (tasks) {
      setTasks(tasks);
    }
  };

  const sortedTasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="App">
      <h1>Gestor de tareas</h1>
      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Tarea"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="En progreso"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Terminado"
          />
        </section>
      </main>
    </div>
  );
};

export default App;
