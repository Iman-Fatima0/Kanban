import React, { useState } from "react";
import { updateaTask } from "../hooks/useTasks";
import toast from "react-hot-toast";

function UpdateTaskCard({ task, updateTask, onClose, getTasks }) {
  const [name, setName] = useState(task.name || "");
  const [Description, setDescription] = useState(task.Description || "");
  const [status, setStatus] = useState(task.status || "To Do");
  const [dueDate, setDueDate] = useState(
    task.dueDate || new Date().toISOString().split("T")[0]
  );
  const [priority, setPriority] = useState(task.priority || "Low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !Description || !status || !dueDate || !priority) {
      toast.error("Please fill in all the fields");
      return;
    }

    const updatedTask = {
      ...task,
      name,
      Description,
      status,
      dueDate,
      priority,
    };
    try {
      const savedTask = await updateaTask(updatedTask);
      await getTasks();
      // await updateTask(savedTask);
      toast.success("Task updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}/>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default UpdateTaskCard;
