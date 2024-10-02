import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [EditingIndex, setEditingIndex] = useState(null);
  const [EditTaskValue, setEditTaskValue] = useState(null);



  function HandleInputChange() {
    setNewTask(event.target.value);
  }

  function AddTask() {
    if (newTask.trim() !== "") {
      setTasks((oldTask) => [...oldTask,{text: newTask, completed:false }]);
      setNewTask("");
    }
  }
  function HandleKeyDownEditing(event){
    if(event.key === "Enter"){ApproveTask()}
  }


  function HandleKeyDown(event){
    if(event.key === "Enter"){AddTask()}
  }

  function EditTask(index) {
    setEditingIndex(index)
    setEditTaskValue(tasks[index].text)
  }

  function ApproveTask(){
    const UpdatedTasks = tasks.map((task ,index) => index === EditingIndex ? {...task, text: EditTaskValue}: task)
    setTasks(UpdatedTasks)
    setEditingIndex(null)
    setEditTaskValue("")

  }

  function RejectEditing(){
    setEditingIndex(null)
    setEditTaskValue("")
  }

  function DeleteTask(index) {
    const UpdatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(UpdatedTasks);
  }

  function MoveTask(index, direction){
    const UpdatedTasks = [...tasks]
  const NewIndex = index + direction;
  

if(NewIndex < 0 || NewIndex >= tasks.length ){
  
  return;
}


[UpdatedTasks[index],UpdatedTasks[NewIndex]] = 
  [UpdatedTasks[NewIndex],UpdatedTasks[index]]

setTasks(UpdatedTasks)
  }

  function ToggleTaskComplete(index){
    const UpdatedTasls = tasks.map((task, oldIndex) => oldIndex === index ? {...task, completed: !task.completed}: task);

    setTasks(UpdatedTasls);
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
          onKeyDown={HandleKeyDown}
        />
        <button className="AddButton" onClick={AddTask}
       >
          Add
        </button>
      </div>

        {tasks.map((task, index) => (
          <li key={index}>
            {EditingIndex !== index && (
          <>
            <input type="checkbox" 
            checked={task.completed}
            onChange={() =>ToggleTaskComplete(index)}/>

            <span className="text"
            style={{textDecoration: task.completed ? "line-through": "none", marginLeft: '8px', flexGrow : 1}}>{task.text}
              
            </span>
          </>
        )}
            
            {EditingIndex === index ? (<>
              <input type="text" className="EditingField"
              placeholder={event.target.value}
              onChange={(e) => setEditTaskValue(e.target.value)}
              onKeyDown={HandleKeyDownEditing}
              />
              <button className="ApproveButton"
            onClick={ApproveTask}>Approve</button>

            <button className="RejectEditingButton"
            onClick={RejectEditing}>Reject</button>
            </>
            ):(
            <button className="EditButton" onClick={() => EditTask(index)}>{" "} Edit </button>
           )} 
            
          {EditingIndex !== index && (
          <>
           <button className="DeleteButton" onClick={() => DeleteTask(index)}>{" "}Delete </button>

          <button className="MoveButtonUp" onClick={() => MoveTask(index, -1)}>Up</button>

          <button className="MoveButtonDown" onClick={() => MoveTask(index, 1)}>Down</button>
          </>
        )} 
          </li>
        ))}
    </div>
  );
}
export default TodoList;