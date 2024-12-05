import React, { useState } from 'react';
import "../styles/Task.css";

const Task = ({ addTask, deleteTask, moveTask, task = {} }) => { 
  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency || 'low');
  const [collapsed, setCollapsed] = useState(task.isCollapsed || false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted || false);
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [startDate, setStartDate] = useState(task.startDate || ''); 

  if (!task) {
    return <div>No task data available</div>;
  }

  const today = new Date();
  const dueDateObj = new Date(dueDate);
  const startDateObj = new Date(startDate); 
  const timeDiff = dueDateObj - today;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const setUrgency = (event) => {
    setUrgencyLevel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (collapsed) {
      setCollapsed(false);
    } else {
      const newTask = {
        id: task.id,
        title: event.target.elements.title.value,
        description: event.target.elements.description.value,
        urgency: urgencyLevel,
        status: task.status, 
        isCollapsed: true,
        isCompleted: isCompleted,
        dueDate: event.target.elements.dueDate.value,
        startDate: event.target.elements.startDate.value,
      };
      addTask(newTask);
      setCollapsed(true);
    }
  };

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""} ${isCompleted ? "completed" : ""}`}>
      {/* Círculo de estado */}
      <div className={`status-circle ${task.status === 'Terminado' ? 'green' : 'red'}`} />

      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Title"
          defaultValue={task.title || ''}
        />
        <textarea
          rows="2"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description || ''}
        />

       <div className="date-buttons">
          <button type="button" className="date-button left" onClick={() => setStartDate(new Date().toISOString().split('T')[0])}>
            Fecha Inicio
          </button>
          <input
            type="date"
            name="startDate"
            className="input"
            defaultValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="date-buttons">
          <button type="button" className="date-button right" onClick={() => setDueDate(new Date().toISOString().split('T')[0])}>
            Fecha Vencimiento
          </button>
          <input
            type="date"
            name="dueDate"
            className="input"
            defaultValue={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="date-info">
          {dueDate && (
            <p className={`dueDate ${daysRemaining <= 0 ? "overdue" : ""}`}>
              {daysRemaining <= 0 ? "Vencida" : `${daysRemaining} días restantes`}
            </p>
          )}
        </div>

        <div className="urgencyLabels">
          <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
            <input
              value="low"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            Corto
          </label>
          <label className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}>
            <input
              value="medium"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            Intermedio
          </label>
          <label className={`high ${urgencyLevel === "high" ? "selected" : ""}`}>
            <input
              value="high"
              onChange={setUrgency}
              type="radio"
              name="urgency"
            />
            Dificil
          </label>
        </div>

        <div className="task-actions">
          <button className="button">{collapsed ? "Edit" : "Save"}</button>

          {collapsed && <button onClick={() => deleteTask(task.id)} className="button delete">Eliminar</button>}
        </div>
      </form>
    </div>
  );
};

export default Task;
