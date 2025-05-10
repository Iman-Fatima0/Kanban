import React, { useContext, useState } from "react";
import { Modal, Button } from "antd";
import AddTaskCard from "./AddTaskCard"; 
import { Link } from "react-router-dom";
import { FileAddOutlined, UserOutlined } from "@ant-design/icons";
import { DataContext } from "../Context/UserContext";
const Navbar = ({ addTask   }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
const {user,userLoggedOut}=useContext(DataContext);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  const handlelogout = () => {
    userLoggedOut();
  }

  return (
    <nav className="flex justify-between items-center p-2 bg-transparent text-white">
      <Link to="/Todopage">
        <h1 className="text-xl font-bold hover:text-orange-600">
        <div className="text-red-400 text-xl ">
          {/* {user.name}'s */}
          </div>Kanban Board</h1>
        {/* console.log(user.name); */}
      </Link>
      <div className="flex space-x-4 items-center">
        {/* <Button 
          type="primary" 
          onClick={showModal} 
          style={{ backgroundColor: "blue", borderColor: "blue" }}
          icon={<FileAddOutlined />}>
          Add Task
        </Button>
        <Modal 
          title="Add a New Task" 
          open={isModalOpen} 
          onCancel={handleCancel} 
          footer={null}>
          <AddTaskCard addTask={addTask} onClose={handleCancel} /> 
        </Modal> */}
        <Link to="/Loginform">
          <Button icon={<UserOutlined />} className="bg-slate-400 hover:bg-slate-700" />
        </Link>
        <Link to="/History">
          <Button className="bg-slate-500  hover:bg-slate-700">History</Button>
        </Link>
        <Button onClick={handlelogout} className="bg-slate-600 hover:bg-slate-700">Logout</Button>
      </div>
    </nav>
  );
};

export default Navbar;
