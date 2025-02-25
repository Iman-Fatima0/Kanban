import React, { useState } from "react";
import { Modal, Button } from "antd";
import AddTaskCard from "./AddTaskCard"; 
import { FileAddOutlined } from "@ant-design/icons";
const Navbar = ({addTask}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#333", color: "#fff" }}>
      <h1>Kanban Board</h1>
      <Button type="primary" onClick={showModal} style={{ background: "blue" }}>
      <FileAddOutlined />
      </Button>
      <Modal title="Add a New Task" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <AddTaskCard addTask={addTask} onClose={handleCancel} /> 
      </Modal>
    </nav>
  );
};

export default Navbar;
