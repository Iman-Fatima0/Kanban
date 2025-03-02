import axios from "axios";
const apiUrl = "http://localhost:3001/task";

export const getAlltasks = async()=>
{
    const res=await axios.get(`${apiUrl}/displayTask`);
    return res.data;

}
export const creatnewTask = async (task) => {
  try {
     const response = await axios.post("http://localhost:3001/task/addTask", task);
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
export const deleteaTask = async(id)=>
{
    const res=await axios.delete(`${apiUrl}/deleteTask/${id._id}`);
    return res.data;
}
export const updateaTask = async(data)=>
{
    const res=await axios.put(`${apiUrl}/updateTask/${data._id}`,data);
    return res.data;
}