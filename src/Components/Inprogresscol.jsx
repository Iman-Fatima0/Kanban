import React, { useState, useEffect } from "react";
import { List, Button, Tag, Modal } from "antd";
import {EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteaTask, updateaTask } from "../hooks/useTasks";
import toast, {Toaster}from "react-hot-toast";
import UpdateTaskCard from "./UpdateTaskCard";


const Inprogresscol = ({tasks, updateTask, deleteTask, handledragstart , getTasks }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.status === "In Progress"));
  }, [tasks]);

  const deltetion = async (id) => {
    // try {
    //   const res = await deleteaTask(id);
    //   deleteTask(res);
    //   toast.success("Task deleted successfully");
    // } catch (err) {
    //   toast.error("Failed to delete task");
    //   console.error(err);
    // }
  };

  const updation = async (task, newstatus=null) => {
    // try {
    //   const updatedtask={...task, status: newstatus || task.status}
    //   const res = await updateaTask(updatedtask);
    //   updateTask(res);
    //   toast.success("Task moved to Done successfully");
    // } catch (err) {
    //   toast.error("Failed to move task to Done");
    //   console.error(err);
    // }
  };

  const showModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div>
        <Toaster position="top-center" reverseOrder={false}/>

      <List
        bordered
        dataSource={filteredTasks}
        renderItem={(task) => (
          <List.Item draggable onDragStart={() => handledragstart(task)}>
            <div>
              <strong className="text-amber-400">{task.name}</strong>
              <p>{task.Description}</p>
              <p>
                <strong>Priority:</strong>{" "}
                <Tag color={task.priority === "High"  ? "red"  : task.priority === "Medium"  ? "orange"  : "green"  } >
                  {task.priority}
                </Tag>
              </p>
              <p>Due Date: {task.dueDate}</p>
            </div>
            <div>
              <Button onClick={() =>deleteTask({_id:task._id})} type="danger">
                <DeleteOutlined />
              </Button>
              <Button onClick={() => showModal(task)} type="primary">
              <EditOutlined />
               </Button>
            </div>
          </List.Item>
        )}
      />
      <Modal
        title="Update Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedTask && (
          <UpdateTaskCard
            task={selectedTask}
            updateTask={updateTask}
            onClose={handleCancel}
            getTasks={getTasks}
          />
        )}
      </Modal>
    </div>
  );
};

export default Inprogresscol;
