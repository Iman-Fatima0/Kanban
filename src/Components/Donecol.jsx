import React, { useState, useEffect } from "react";
import { List, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const Donecol = ({ tasks, deleteTask }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks.filter((task) => task.status === "done"));
  }, [tasks]);

  return (
    <div>
      <List bordered dataSource={filteredTasks} renderItem={(task) => (
          <List.Item>
            <div>
              <h3>{task.title}</h3>
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
// In the above code snippet, the Donecol component is defined. This component displays the tasks that are in the "Done" status. It receives tasks and deleteTask as props. The tasks prop contains all the tasks, and the deleteTask function is used to delete tasks.
// The component uses the List component from the antd library to display the tasks. It filters the tasks based on the "done" status and renders the task details along with a "Delete" button for each task.