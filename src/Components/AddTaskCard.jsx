import React, { useState, useEffect } from "react";
import { creatnewTask } from "../hooks/useTasks";
import toast from "react-hot-toast";

function AddTaskCard({ addTask, onClose }) {
  const [name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState();
  const [priority, setPriority] = useState("Low");  
  // const [tasks, setTasks] = useState(() => {
  //   return JSON.parse(localStorage.getItem("tasks")) || [];
  // });

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !Description || !status || !dueDate || !priority) {
      toast.error("Please fill in all the fields");
      return;
    }

    const newTask = { name:name, Description:Description, status:status, dueDate:dueDate, priority:priority };

    try {
      const savedTask = await creatnewTask(newTask);
      toast.success("Task added successfully");
      // setTasks((prevTasks) => [...prevTasks, savedTask]);
      addTask(savedTask);
      setName("");
      setDescription("");
      setStatus("To Do");
      setDueDate(new Date().toISOString().split("T")[0]);
      setPriority("Low");

      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <input type="text"  placeholder="Description" value={Description} onChange={(e) => setDescription(e.target.value)}/>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /> 
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskCard;
