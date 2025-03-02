import React, { useState, useEffect } from "react";
import { Flex, Splitter, Typography } from "antd";
import Navbar from "../Components/Navbar";
import Todocol from "../Components/Todocol";
import Inprogresscol from "../Components/Inprogresscol";
import Donecol from "../Components/Donecol";
import { deleteaTask, updateaTask, creatnewTask, getAlltasks } from "../hooks/useTasks";

const TodoPage = () => {
  const [draggedtask, setdraggedtask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await getAlltasks();
        if (data && Array.isArray(data.alltask)) {
          setTasks(data.alltask);
        } else {
          console.error("Fetched tasks are not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  const addTask = async (newtask) => {
    try {
      const savedTask = await creatnewTask(newtask);
      console.log(savedTask);
      setTasks([...tasks, savedTask]);
      
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await updateaTask(updatedTask); 
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? response.data : task)));
      toast.success("Task updated successfully"); 
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task"); 
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
      await deleteaTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handledragstart = (task, index) => {
    setdraggedtask(task);
  };

  const handledragover = (e) => {
    e.preventDefault();
  };

  const handledargdrop = (draggedstatus) => {
    if (draggedtask) {
      updateTask({ ...draggedtask, status: draggedstatus });
      setdraggedtask(null);
    }
  };

  return (
    <div>
      <Navbar addTask={addTask} />
      <Splitter style={{ height: "80vh", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" ,backgroundColor:" oklch(0.871 0.006 286.286)" }} >
        <Splitter.Panel collapsible>
          <Flex justify="center" align="center">
            <Typography.Title type="secondary" level={5}>
              To Do
            </Typography.Title>
          </Flex>
          <div onDragOver={handledragover} onDrop={() => handledargdrop("To Do")} style={{backgroundColor:" oklch(0.871 0.006 286.286)"}}>
            <Todocol
              tasks={Array.isArray(tasks) ? tasks.filter((a) => a.status === "To Do") : []}
              updateTask={updateTask}
              deleteTask={deleteTask}
              handledragstart={handledragstart}
            />
          </div>
        </Splitter.Panel>

        <Splitter.Panel collapsible={{ start: true }}>
          <Flex justify="center" align="center" >
            <Typography.Title type="secondary" level={5}>
              In Progress
            </Typography.Title>
          </Flex>
          <div onDragOver={handledragover} onDrop={() => handledargdrop("In Progress")}>
            <Inprogresscol
              tasks={Array.isArray(tasks) ? tasks.filter((task) => task.status === "In Progress") : []}
              updateTask={updateTask}
              deleteTask={deleteTask}
              handledragstart={handledragstart}
            />
          </div>
        </Splitter.Panel>

        <Splitter.Panel>
          <Flex justify="center" align="center">
            <Typography.Title type="secondary" level={5}>
              Done
            </Typography.Title>
          </Flex>
          <div onDragOver={handledragover} onDrop={() => handledargdrop("Done")}>
            <Donecol
              tasks={Array.isArray(tasks) ? tasks.filter((task) => task.status === "Done") : []}
              updateTask={updateTask}
              deleteTask={deleteTask}
              handledragstart={handledragstart}
            />
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

export default TodoPage;