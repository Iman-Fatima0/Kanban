import React, { useState, useContext } from "react";
import { Login } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import { DataContext } from "../Context/UserContext";

const Loginform = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  
  const { userLoggedIn } = useContext(DataContext); 
  

  const Loginfunc = async (e) => {
    e.preventDefault(); 

    try {
      const res = await Login(form);
      console.log(res); 
      // setForm(res); 
      if(res && res.token)
      {
      userLoggedIn(res.token); 
      toast.success("Login Successfully");
      navigate('/Todopage');
      }
      else{
        toast.error("Invalid Email or Password");
      }
    } catch (err) {
      toast.error("Failed to Login");
      console.error(err);
    }
  };

  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="flex items-center justify-center h-screen ">
        <div className="w-80 bg-gray-800 text-gray-200 p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-xl font-semibold mb-3">Login</h2>
          <form className="space-y-3" onSubmit={Loginfunc}>
            <div>
              <label htmlFor="email" className="text-sm text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={form.email }
                onChange={(e) =>
                  setForm((prevForm) => ({ ...prevForm, email: e.target.value }))
 }
                className="w-full mt-1 p-2.5 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-gray-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={form.password }
                onChange={(e) =>
                  setForm((prevForm) => ({ ...prevForm, password: e.target.value }))
                }
                className="w-full mt-1 p-2.5 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600" />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-gray-900 font-semibold py-2 rounded">
              Sign In
            </button>
          </form>
          <p className="text-center text-xs mt-3 text-gray-400">
            Don't have an account?{" "}
            <a href="/SignUp" className="text-red-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Loginform;
