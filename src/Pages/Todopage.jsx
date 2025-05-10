import React, { useState, useEffect } from "react";
import { Flex, Splitter, Typography } from "antd";
import Navbar from "../Components/Navbar";
import Todocol from "../Components/Todocol";
import Inprogresscol from "../Components/Inprogresscol";
import Donecol from "../Components/Donecol";

const TodoPage = () => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
const [draggedtask,setdraggedtask]=useState(null);
// const [draggedIndex,setdraggedindex]=useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.title === updatedTask.title ? updatedTask : task)));
  };

  const deleteTask = (taskTitle) => {
    setTasks(tasks.filter(task => task.title !== taskTitle));
  };

  const handledragstart = (task,index ) => {
    setdraggedtask(task);
    setdraggedindex(index);
  };
  
  const handledragover = (e) => {
    e.preventDefault();
  };
  
  
  const handledargdrop=(draggedstatus)=>
    {
     if(draggedtask)
     {
      updateTask({...draggedtask,status:draggedstatus});
      setdraggedtask(null);
     }
    }
  return (
    <div>
      <Navbar addTask={addTask} />

      <Splitter style={{height: "80vh",boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",}} >
        <Splitter.Panel collapsible>
          <Flex justify="center" align="center">
            <Typography.Title type="secondary" level={5}>
              To Do
            </Typography.Title>
          </Flex>
          <div onDragOver={handledragover}   onDrop={()=>handledargdrop("todo")}>
          <Todocol tasks={tasks.filter(task => task.status === "todo")} updateTask={updateTask} deleteTask={deleteTask}  handledragstart={handledragstart} />
          </div>
        </Splitter.Panel>

        <Splitter.Panel collapsible={{ start: true }}>
          <Flex justify="center" align="center">
            <Typography.Title type="secondary" level={5}>
              In Progress
            </Typography.Title>
          </Flex>
          <div onDragOver={handledragover} onDrop={()=>handledargdrop("inprogress")}>
          <Inprogresscol tasks={tasks.filter(task => task.status === "inprogress")} updateTask={updateTask} deleteTask={deleteTask}  handledragstart={handledragstart}  />
            </div>
        </Splitter.Panel>
        <Splitter.Panel >
          <Flex justify="center" align="center">
            <Typography.Title type="secondary" level={5}>
              Done
            </Typography.Title>
          </Flex>
          <div onDragOver={handledragover} onDrop={() => handledargdrop("done")}>
          <Donecol tasks={tasks.filter(task => task.status === "done")} updateTask={updateTask} deleteTask={deleteTask}  handledragstart={handledragstart}  />
            </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

export default TodoPage;