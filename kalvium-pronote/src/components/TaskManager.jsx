import { Component } from 'react';
import './TaskManager.css'

class TaskManager extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      tasks: [],
      editIndex: -1,
      editInput: ''
    };
  }

  render() {
    const { userInput, tasks, editIndex, editInput } = this.state;

    const handleInputChange = (e) => {
      this.setState({ userInput: e.target.value });
    };

    const addTask = () => {
      this.setState({
        tasks: [...tasks, userInput],
        userInput: '' // Clear input field after adding task
      });
    };

    const enableEdit = (index) => {
      this.setState({
        editIndex: index,
        editInput: tasks[index] // Set current task text to edit input
      });
    };

    const handleEditInputChange = (e) => {
      this.setState({ editInput: e.target.value });
    };

    const updateTask = () => {
      const updatedTasks = tasks.map((item, index) => {
        if (index === editIndex) {
          return editInput;
        }
        return item;
      });

      this.setState({
        tasks: updatedTasks,
        editIndex: -1, // Reset edit index
        editInput: '' // Clear edit input field
      });
    };

    const deleteTask = (taskIndex) => {
      const remainingTasks = tasks.filter((_, index) => index !== taskIndex);
      this.setState({
        tasks: remainingTasks
      });
    };

    return (
      <>
        <div className='task-list'>
          <h1 className='title'>Task List</h1>
          <input
            type='text'
            className='input-field'
            placeholder='Add new task'
            value={userInput}
            onChange={handleInputChange}
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        {editIndex === -1 ? (
          <div>
            {tasks.map((item, index) => (
              <div key={index}>
                <p>{item}</p>
                <button onClick={() => enableEdit(index)}>Edit Task</button>
                <button onClick={() => deleteTask(index)}>Remove Task</button>
              </div>
            ))}
          </div>
        ) : (
          <div className='edit-section'>
            <input
              type='text'
              className='edit-input'
              value={editInput}
              onChange={handleEditInputChange}
            />
            <button onClick={updateTask}>Update Task</button>
            <button onClick={() => this.setState({ editIndex: -1 })}>Cancel</button>
          </div>
        )}
      </>
    );
  }
}

export default TaskManager;
