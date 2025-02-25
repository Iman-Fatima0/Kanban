import React, { useState, useEffect } from "react";
import { List, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const Inprogresscol = ({ tasks, updateTask, deleteTask }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.status === "inprogress"));
  }, [tasks]);

  return (
    <div>
      <List
        bordered
        dataSource={filteredTasks} 
        renderItem={(task) => (
          <List.Item>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Priority:</strong> <Tag color={task.priority === "high" ? "red" : task.priority === "medium" ? "orange" : "green"}>{task.priority}</Tag>
              </p>
              <p>Due Date: {task.dueDate}</p>
            </div>
            <div>
              <Button onClick={() => updateTask({ ...task, status: "done" })} type="default">
              Done
              </Button>
              <Button onClick={() => deleteTask(task.title)} type="danger">
              <DeleteOutlined />
              </Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Inprogresscol;
