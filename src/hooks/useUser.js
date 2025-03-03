import axios from "axios";

const apiUrl = "http://localhost:3001/user";

export const Login =async (data) =>
{
  
    const res= axios.post(`${apiUrl}/login`,data,{withCredentials:true});
    console.log(res);
    return res.data;
}

export const SignUp = async (data) => {
    const res = await axios.post(`${apiUrl}/Signup`, data,{withCredentials:true});
    return res.data;
}