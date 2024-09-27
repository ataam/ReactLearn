import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState(["12312", "rfasdasd", "312312"]);
  const [newTask, setNewTask] = useState("");

  function HandleInputChange() {
    setNewTask(event.target.value);
  }

  function AddTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function DeleteTask(index) {
    const UpdatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(UpdatedTasks);
  }

  function MoveTaskUp(index) {
    if (index > 0) {
      const UpdatedTasks = [...tasks];
      [UpdatedTasks[index], UpdatedTasks[index - 1]] = [
        UpdatedTasks[index - 1],
        UpdatedTasks[index],
      ];
      setTasks(UpdatedTasks);
    }
  }
  function MoveTaskDown(index) {
    if (index < tasks.length - 1) {
      const UpdatedTasks = [...tasks];
      [UpdatedTasks[index], UpdatedTasks[index + 1]] = [
        UpdatedTasks[index + 1],
        UpdatedTasks[index],
      ];
      setTasks(UpdatedTasks);
    }
  }

  return (
    <div className="TodoList">
      <h1>ToDoList</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={HandleInputChange}
        />
        <button className="AddButton" onClick={AddTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="DeleteButton" onClick={() => DeleteTask(index)}>
              {" "}
              Delete
            </button>
            <button className="MoveButtonUp" onClick={() => MoveTaskUp(index)}>
              {" "}
              up
            </button>
            <button
              className="MoveButtonDown"
              onClick={() => MoveTaskDown(index)}
            >
              {" "}
              Down
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default TodoList;
