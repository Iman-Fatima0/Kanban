import axios from "axios";

const apiUrl = "http://localhost:3001/user";

export const Login =async (data) =>
{
    const res= axios.post(`${apiUrl}/Login`,data);
    return res.data;
}

export const Signup = async (data) => {
    const res = await axios.post(`${apiUrl}/Signup`, data);
    return res.data;
}