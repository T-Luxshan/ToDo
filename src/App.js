import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './App.css';
import {Task} from './Task';
import { addNewTask, fetchAllTask, deleteTask } from './service/ToDoService'; 

import axios from "axios";

function App() {

  const [toDoList, setToDoList] = useState([]); 
  const [allTask, setAllTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(()=> {
     fetchAllTask()
     .then(response=>{
       console.log(response.data);
       setToDoList(response.data)})
     .catch(e=>console.log("fetching failed"));
  }, [])

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = async () =>  {
    if (newTask.trim() === "") return;

    const taskObj = {
      id: toDoList.length === 0 ? 1 : toDoList[toDoList.length-1].id + 1,
      task: newTask,
      completed: false
    }
    setNewTask("");
    // console.log(task.id);
    // console.log(task.taskName);
    // console.log(task.completed);
    setToDoList([...toDoList, taskObj])
    

    // const response = await addNewTask(task.taskName, task.completed);
    // console.log(response);
    addNewTask(taskObj.task, taskObj.completed)
    .then(res=>alert("Task added successfully!"))
    .catch(e=>alert("Failed to add task!"));
  }

  const taskCompleted = (id) => {
    setToDoList(
      toDoList.map((task) =>{
        if(task.id === id){
          return{...task, completed:true};
        }else{
          return task;
        }
      })
    )
  }

  const deleteTask = (id) => {
    deleteTask(id)
    .then(res=>{
      setToDoList(toDoList.filter((task) => task.id !== id));
      alert("Deletion successful");
    })
    .catch(err=>alert("Deletion failed"));

  }
   
  return (
    <div className="App">
            <div className="container addTask">
              <h1 style={{padding:"10px"}} className="addTask-head">To-Do App</h1>
                <div className="row">
                  <div className="col-4">
                      <input className='textBox' value={newTask} onChange={handleChange} placeholder="Add your new todo"/>&nbsp;
                  </div>
                  <div className="col-4">
                      <button className='btn btn-outline-success addBtn' onClick={addTask}><FaPlus size={30} /></button>
                  </div>
                </div>
            </div>
            <div className='list'>
                {toDoList.map((taskObj) => {
                  return ( 
                    <Task 
                        task={taskObj.task} 
                        id={taskObj.id}
                        completed={taskObj.completed}
                        deleteTask={deleteTask}
                        taskCompleted={taskCompleted}
                    />
                  );
                })}
            </div>
    </div>
  );
}

export default App;
