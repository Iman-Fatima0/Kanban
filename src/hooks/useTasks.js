import axios from "axios";
const apiUrl = "http://localhost:3001/task";

export const getAlltasks = async () => {
  const res = await axios.get(`${apiUrl}/display`, {
    withCredentials: true,
  });
  return res.data;
};
export const creatnewTask = async (task) => {
  try {
    const response = await axios.post("http://localhost:3001/task/add", task, {
      withCredentials: true,
    });
    // const response = await axios.post({
    //   url: "http://localhost:3001/task/addTask",
    //   method: "post",
    //   data: task,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteaTask = async (id) => {
  const res = await axios.delete(`${apiUrl}/delete/${id._id}`, {
    withCredentials: true,
  });
  return res.data;
};
export const updateaTask = async (data) => {
  const res = await axios.put(`${apiUrl}/update/${data._id}`, data, {
    withCredentials: true,
  });
  return res.data;
};
