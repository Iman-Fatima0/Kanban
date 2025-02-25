import React, { useState, useEffect } from 'react';

function AddTaskCard({addTask , onClose}) {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [status, setstatus] = useState("todo");
    const [dueDate, setdueDate] = useState("");
    const [priority, setpriority] = useState("low");

    const [task, settask] = useState(() => {
        return JSON.parse(localStorage.getItem("task")) || [];
    });

    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(task));
    }, [task]);

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !status || !dueDate || !priority) {
            alert("Please fill all the fields");
            return;
        }

        const newTask = { title, description, status, dueDate, priority };
        const updatedTasks = [...task, newTask];

        settask(updatedTasks);
        localStorage.setItem("task", JSON.stringify(updatedTasks)); 

        addTask(newTask);

        settitle("");
        setdescription("");
        setstatus("");
        setdueDate("");
        setpriority("");
        
        onClose();
      
        
    };

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => settitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
                <select type="text" placeholder="Status" value={status} onChange={(e) => setstatus(e.target.value)} >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                <input type="date" placeholder="Due Date" value={dueDate} onChange={(e) => setdueDate(e.target.value)} />
                <select type="text" placeholder="Priority" value={priority} onChange={(e) => setpriority(e.target.value)} >
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
