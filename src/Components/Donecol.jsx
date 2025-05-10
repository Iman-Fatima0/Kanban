import React, { useState, useEffect } from "react";
import { List, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const Donecol = ({ tasks, deleteTask, handledragstart }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.status === "done"));
  }, [tasks]);
  // const dragstart = (e, task) => {
  //   e.dataTransfer.setData("task", JSON.stringify(task));
  // };

  // const dragend = (e) => {
  //   const droppedTask = JSON.parse(e.dataTransfer.getData("task")); 
  //   console.log("Task dragged:", droppedTask);
  // };
  return (
    <div>
      <List bordered dataSource={filteredTasks} renderItem={(task,index) => (
          <List.Item draggable  onDragStart={() => handledragstart(task , index)}  >
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>
                <strong>Priority:</strong> <Tag color={task.priority === "high" ? "red" : task.priority === "medium" ? "orange" : "green"}>{task.priority}</Tag>
              </p>
              <p>
                <strong>Due Date:</strong> {task.dueDate}
              </p>
              <Tag color="blue">Completed </Tag>
            </div>
            <div>
              <Button onClick={() => deleteTask(task.title)} type="danger" >
               <DeleteOutlined />
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Donecol;
