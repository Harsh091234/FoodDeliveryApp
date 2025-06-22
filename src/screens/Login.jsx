import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleUserSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        email: credentials.email,
        password: credentials.password,

      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) alert("Enter valid credentials");
    if(json.success){
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    } 

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  return (
     <div className="h-svh bg-stone-950 p-3 bg flex items-center justify-center">
      <div className="max-md:w-full w-md">
        <h1 className="text-4xl text-yellow-200 text-center">Login</h1>

        <form className="mt-8  flex flex-col items-center" onSubmit={handleUserSignup}>
          {/* Email */}
          <div className="flex flex-col w-full mb-3">
            <label htmlFor="email" className="text-lime-400 text-lg">Email</label>
            <input
              name="email"
              type="email"
              value={credentials.email}
              onChange={onChange}
              className="w-full border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col w-full mb-6">
            <label htmlFor="password" className="text-lime-400 text-lg">Password</label>
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={onChange}
              className="w-full border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5"
            />
          </div>

          {/* Buttons */}
          <div className='max-md:flex-col w-full  max-md:items-stretch items-center max-md:gap-2 flex gap-5 '>
            <button type='submit' className=' bg-transparent hover:bg-amber-400 text-md px-5 py-1 rounded-md text-amber-300 hover:text-white border-[1.2px] border-amber-300 transition-colors duration-300 cursor-pointer'>
                Submit
              </button>
              <Link to="/signup" className=" text-center bg-transparent hover:bg-orange-500 text-md px-5 py-[5.2px] rounded-md text-orange-400 hover:text-white border-[1.9px] border-orange-400 transition-colors duration-300 cursor-pointer">New user? Sign up</Link>
          
                </div>
        </form>
      </div>
    </div>
  )
}

export default Login