import React, { useState, useEffect } from "react";
import { List, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const Todocol = ({
  tasks,
  updateTask,
  deleteTask,
  handledragstart,

}) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.status === "todo"));
  }, [tasks]);

  return (
    <div>
      <List
        bordered
        dataSource={filteredTasks}
        renderItem={(task, index) => (
          <List.Item draggable onDragStart={() => { handledragstart(task, index);}}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>
                <strong>Priority:</strong>{" "}
                <Tag color={ task.priority === "high"? "red": task.priority === "medium" ? "orange" : "green"} >
                  {task.priority}
                </Tag>
              </p>
              <p>Due Date: {task.dueDate}</p>
            </div>
            <div>
              <Button
                onClick={() => updateTask({ ...task, status: "inprogress" })}
                type="default"
              >
                Move To Progressed
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

export default Todocol;
