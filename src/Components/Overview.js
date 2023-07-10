import React, { useState } from "react";

const Overview = (props) => {
  const { tasks, onDeleteTask, onEditTask } = props;
  const [editedTasks, setEditedTasks] = useState({});
  let serialNumber = 0;

  const handleEditInputChange = (taskId, value) => {
    setEditedTasks({ ...editedTasks, [taskId]: value });
  };

  return (
    <div>
      {tasks.map((task) => {
        if (task.editMode) {
          return (
            <div key={task.id} className="mb-3 custom-edit-form">
              {`${++serialNumber}. `}
              <input
                type="text"
                value={editedTasks[task.id] || task.text}
                className="form-control custom-edit-input"
                onChange={(e) => handleEditInputChange(task.id, e.target.value)}
              />
              <button onClick={() => onEditTask(task.id, editedTasks[task.id]) } className="btn btn-success mt-2 custom-resubmit">
                Resubmit
              </button>
            </div>
          );
        } else {
          return (
            <div key={task.id} className="mb-3 custom-task">
              {`${++serialNumber}. ${task.text}`}
              <div className="task-buttons">
                <button onClick={() => onDeleteTask(task.id)} className="btn btn-danger ml-2 custom-delete">Delete</button>
                <button onClick={() => onEditTask(task.id)} className="btn btn-danger ml-2 custom-edit">Edit</button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Overview;
