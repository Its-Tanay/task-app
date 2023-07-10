import React, { Component } from "react";
import uniqid from "uniqid";
import Overview from "./Components/Overview";
import Header from "./Components/header";
import "./styles.css"

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: {
        text: "",
        id: uniqid(),
        editMode: false,
      },
      tasks: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      task: {
        ...this.state.task,
        text: e.target.value,
      },
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        text: "",
        id: uniqid(),
        editMode: false,
      },
    });
  };

  onDeleteTask = (taskId) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: updatedTasks });
  };

  onEditTask = (taskId, editedText) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          text: editedText,
          editMode: !task.editMode,
        };
      }
      return task;
    });
    this.setState({ tasks: updatedTasks });
  };
  

  render() {
    const { task, tasks } = this.state;

    return (
      <div className="container mt-5 custom-container">
        <Header />
        <div className="custom-form-container">
          <form onSubmit={this.onSubmitTask}>
            <div className="form-group custom-form">
              <label htmlFor="taskInput" className="form-label custom-label">Enter Task</label>
              <input
                onChange={this.handleChange}
                value={task.text}
                type="text"
                className="form-control custom-input"
                id="taskInput"
              />
            </div>
            <button type="submit" className="btn btn-primary custom-submit-btn">
              Add Task
            </button>
          </form>
        </div>
        <Overview
          tasks={tasks}
          onDeleteTask={this.onDeleteTask}
          onEditTask={this.onEditTask}
        />
      </div>
    );
  }    
}

export default App;
