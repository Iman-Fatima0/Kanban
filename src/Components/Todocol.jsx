import React, { useState, useEffect } from "react";
import { List, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const Todocol = ({ tasks, updateTask, deleteTask,handledragstart }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.status === "todo"));
  }, [tasks]);

  return (
    <div>
      <List bordered dataSource={filteredTasks} renderItem={(task) => (
          <List.Item draggable  onDragStart={() => handledragstart(task)}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>               
                 <strong>Priority:</strong> <Tag color={task.priority === "high" ? "red" : task.priority === "medium" ? "orange" : "green"}>{task.priority}</Tag>
              </p>
              <p>Due Date: {task.dueDate}</p>
            </div>
            <div>
              <Button onClick={() => updateTask({ ...task, status: "inprogress" })} type="default">
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
// In the above code snippet, the Todocol component is defined. This component displays the tasks that are in the "To Do" status. It receives tasks, updateTask, and deleteTask as props. The tasks prop contains all the tasks, and the updateTask and deleteTask functions are used to update and delete tasks, respectively.