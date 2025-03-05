import React from "react";
import { SignUp } from "../hooks/useUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUpform = () => {
    const navigate= useNavigate();

    const [form, setForm] = React.useState({ name:"", email: "" , password:"",role:" "});
    const SignUpfunc = async (e) => {
      e.preventDefault();
        try {
          const res = await SignUp(form);
          setForm(res);
          toast.success("SignUp Successfully");
          navigate("/Loginform");
        } catch (err) {
          toast.error("Failed to SignUp");
          console.error(err);
        }
      };
  return (

  <>       
   {/* <Toaster position="top-center" reverseOrder={false}/> */}
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-3">Sign Up</h2>
        <form className="space-y-3">
          <div>
            <label htmlFor="name" className="text-sm text-gray-400">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={form.name}   onChange={(e) =>   setForm(prevForm => ({ ...prevForm,   name: e.target.value  }))}
              className="w-full mt-1 p-2.5 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label htmlFor="role" className="text-sm text-gray-400">
              Role
              </label>
            <select
              type="text"
              id="role" value={form.role} onChange={(e)=>{ setForm(prevForm=>({...prevForm,role:e.target.value})) }}
              className="w-full mt-1 p-2.5 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="Admin" onChange={(e)=>{setForm(e.target.value);}} >Admin</option>
            <option value="User" onChange={(e)=>{setForm(e.target.value);  }}>User</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-gray-400">
              Email
            </label>
            <input type="email" value={form.email}  onChange={(e)=>{ setForm(prevForm=>({...prevForm, email:e.target.value})) }}id="email" className="w-full mt-1 p-2.5 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <input type="password"value={form.password}   onChange={(e)=>{ setForm(prevForm=>({...prevForm, password:e.target.value})) }} id="password" className="w-full mt-1 p-2.5 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"/>
          </div>
          <button onClick={(e)=>SignUpfunc(e)} className="w-full bg-red-500 hover:bg-red-600 text-gray-900 font-semibold py-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUpform;
