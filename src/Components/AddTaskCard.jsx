import React, { useState, useEffect } from "react";
import { creatnewTask } from "../hooks/useTasks";
import toast from "react-hot-toast";

function AddTaskCard({ addTask, onClose }) {
  const [name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
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
    try {
      const newTask = { name:name, Description:Description, status:status, dueDate:dueDate, priority:priority };
      addTask(newTask)
      toast.success("Task added successfully");
      // setTasks((prevTasks) => [...prevTasks, savedTask]);
      // addTask(savedTask);
      setName("");
      setDescription("");
      setStatus("To Do");
      setDueDate("");
      setPriority("Low");

      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  return (
    <div className="bg-[oklch(0.268_0.007_34.298)] p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-red-700 text-white border border-red-800 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-300 hover:shadow-lg" />
        <input type="text"  placeholder="Description" value={Description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-red-700 text-white border border-red-800 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-300 hover:shadow-lg"/>
        <select value={status} onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 bg-red-700 text-white border border-red-800 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-300 hover:shadow-lg">
          <option value="To Do" className="bg-red-400">To Do</option>
          <option value="In Progress" className="bg-yellow-400">In Progress</option>
          <option value="Done" className="bg-green-400">Done</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} 
                  className="w-full p-3 bg-red-700 text-white border border-red-800 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-300 hover:shadow-lg"/> 
        <select value={priority} onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-3 bg-red-700 text-white border border-red-800 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-300 hover:shadow-lg"
>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit"
         className="w-full p-3 bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 hover:bg-red-500">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskCard;
