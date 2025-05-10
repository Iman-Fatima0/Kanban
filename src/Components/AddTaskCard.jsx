import React, { useState, useEffect } from "react";

function AddTaskCard({ addTask, onClose }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setdueDate] = useState(new Date());
  const [priority, setPriority] = useState("low");
  const [task, settask] = useState(() => {
    return JSON.parse(localStorage.getItem("task")) || [];
  });

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  const handlesubmit = (e) => {
    e.preventDefault();
    // if (status == "") {
    //   setStatus("todo");
    // }

    // if (priority == "") {
    //   setPriority("low");
    // }
    if (!title || !description || !status || !dueDate || !priority) {
      console.log(title);
      console.log(description);
      console.log(status);
      console.log(dueDate);
      console.log(priority);
      alert("Please fill all the fields");
      return;
    }

    const newTask = { title, description, status, dueDate, priority };
    const updatedTasks = [...task, newTask];

    settask(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));

    addTask(newTask);
    console.log("test here")

    settitle("");
    setdescription("");
    setStatus("");
    setdueDate("");
    setPriority("");

    onClose();
  };

  //   const handleChange = (e, b) => {
  //     debugger;
  //     console.log(e.target.value);
  //     if (b === "priority") {
  //       setPriority(e.target.value);
  //     } else {
  //       setStatus(e.target.value);
  //     }
  //   };
  const handlePriorityChange = (e) => {

    console.log("priority: " + e.target.value);
    setPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    console.log("status: " + e.target.value);
    setStatus(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            console.log("title: " + e.target.value);
            settitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            console.log("description: " + e.target.value);
            setdescription(e.target.value);
          }}
        />
        <select
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => {
            console.log("status: " + e);
            handleStatusChange(e);
          }}
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="date"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => {
            console.log("duedata", e.target.value);
            setdueDate(e.target.value);
          }}
        />
        <select
          type="text"
          placeholder="Priority"
          value={priority}
          onChange={(e) => {
            console.log("priority", e)
            handlePriorityChange(e);
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskCard;
