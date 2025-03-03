import axios from "axios";
const apiUrl = "http://localhost:3001/logger";

export const getAllLoggers = async()=>
{
    const res=await axios.get(`${apiUrl}/allloggers`,{withCredentials:true});
    return res.data;

}