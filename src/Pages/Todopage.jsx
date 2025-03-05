import React, { useState, useEffect } from "react";
import { Flex, Splitter, Typography } from "antd";
import Todocol from "../Components/Todocol";
import Inprogresscol from "../Components/Inprogresscol";
import Donecol from "../Components/Donecol";
import { Modal, Button } from "antd";
import AddTaskCard from "../Components/AddTaskCard"; 
import { FileAddOutlined } from "@ant-design/icons";
import {
  deleteaTask,
  updateaTask,
  creatnewTask,
  getAlltasks,
} from "../hooks/useTasks";
import toast from "react-hot-toast";

const TodoPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [draggedtask, setdraggedtask] = useState(null);
  const [tasks, setTasks] = useState([]);
  console.log("tasks", tasks);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async (newtask) => {
    try {
      const savedTask = await creatnewTask(newtask);
      console.log(savedTask);
      setTasks([...tasks, savedTask]);
      await getTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      console.log("updateTask");
      const response = await updateaTask(updatedTask);
      console.log("response", response);
      console.log("response.data.taskupdated", response.taskupdated);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? response.taskupdated : task
        )
      );
      await getTasks();
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
      await getTasks();
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
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Button type="primary" className="bg-green-400" onClick={showModal} icon={<FileAddOutlined />} />
      </div>
        <Modal 
          title="Add a New Task" 
          open={isModalOpen} 
          onCancel={handleCancel} 
          footer={null}>
          <AddTaskCard addTask={addTask} onClose={handleCancel} /> 
        </Modal>
      <Splitter
        style={{
          height: "80vh",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: " oklch(0.268 0.007 34.298)",
        }}
      >
        <Splitter.Panel collapsible>
          <Flex justify="center" align="center">
            <Typography.Title type="secondary" level={5}>
              <div className="text-red-500">To Do</div>
            </Typography.Title>
          </Flex>
          <div
            onDragOver={handledragover}
            onDrop={() => handledargdrop("To Do")}
            style={{ backgroundColor: "oklch(0.871 0.006 286.286)" }}
          >
            <Todocol
              tasks={
                Array.isArray(tasks)
                  ? tasks.filter((a) => a.status === "To Do")
                  : []
              }
              updateTask={updateTask}
              deleteTask={deleteTask}
              handledragstart={handledragstart}
              getTasks={getTasks}
            />
          </div>
        </Splitter.Panel>

        <Splitter.Panel collapsible={{ start: true }}>
          <Flex justify="center" align="center">
            <Typography.Title type="secondary" level={5}>
              <div className="text-yellow-400">In Progress</div>
            </Typography.Title>
          </Flex>
          <div
            onDragOver={handledragover}
            onDrop={() => handledargdrop("In Progress")}
            style={{ backgroundColor: "oklch(0.871 0.006 286.286)" }}
          >
            <Inprogresscol
              tasks={
                Array.isArray(tasks)
                  ? tasks.filter((task) => task.status === "In Progress")
                  : []
              }
              updateTask={updateTask}
              deleteTask={deleteTask}
              handledragstart={handledragstart}
              getTasks={getTasks}
            />
          </div>
        </Splitter.Panel>

        <Splitter.Panel>
          <Flex justify="center" align="center">
            <Typography.Title type="secondary" level={5}>
              <div className="text-green-500"> Done </div>
            </Typography.Title>
          </Flex>
          <div
            onDragOver={handledragover}
            onDrop={() => handledargdrop("Done")}
            style={{ backgroundColor: "oklch(0.871 0.006 286.286)" }}
          >
            <Donecol
              tasks={
                Array.isArray(tasks)
                  ? tasks.filter((task) => task.status === "Done")
                  : []
              }
              updateTask={updateTask}
              deleteTask={deleteTask}
              handledragstart={handledragstart}
              getTasks={getTasks}
            />
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

export default TodoPage;
