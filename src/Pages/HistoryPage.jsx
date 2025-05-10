import React, { useState, useEffect } from "react";
import { Avatar, List } from "antd";
import toast  from "react-hot-toast";
import { getAllLoggers } from "../hooks/useLoader";

const HistoryPage = () => {
  const [loggers, setLoggers] = useState([]);

  const getLoggers = async () => {
    try {
      const data = await getAllLoggers();
      console.log("data", data.loggers);
      if (data && data.loggers && Array.isArray(data.loggers)) {
        setLoggers(data.loggers);
        toast.success("Logs fetched successfully.");
      } else {
        console.error("Fetched logs are not an array:", data);
        toast.error("Failed to fetch logs, please try again later.");
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Error fetching logs, please try again later.");
    }
  };

  useEffect(() => {
    getLoggers();
  }, []);

  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <List
        itemLayout="horizontal"
        dataSource={loggers}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>
              }
              title={
                <a href={`https://ant.design/loggers/${item._id}`}>
                  Logger ID: {item._id}
                </a>
              }
              description={`Logged at: ${item.timestamp}`}
            />
            <div>
              <strong>User:</strong>{" "}
              {item.User.length > 0 ? item.User[0].name : "No user data"}
            </div>
            <div>
              <strong>Message:</strong>{" "}
              {item.message || "No message available."}
            </div>
          
          </List.Item>
        )}
      />
    </>
  );
};

export default HistoryPage;
