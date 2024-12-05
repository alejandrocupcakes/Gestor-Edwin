import "../styles/StatusLine.css";
import Task from "./Task.jsx";

const StatusLine = ({ status, tasks = [], addTask, deleteTask, addEmptyTask, moveTask }) => { 
  
  const handleEmpty = () => {
    addEmptyTask(status);
  };

  const tasksForStatus = tasks.filter((task) => task.status === status);

  const taskList = tasksForStatus.map((task) => (
    <Task
      key={task.id}
      {...task}
      addTask={(task) => addTask(task)}
      deleteTask={(id) => deleteTask(id)}
      moveTask={(id, status) => moveTask(id, status)}
    />
  ));

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      <button onClick={handleEmpty} className="button addTask">
        +
      </button>
    </div>
  );
};

export default StatusLine;
