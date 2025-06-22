import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



    
const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials]  = useState({name: "", email: "", password: "", geolocation: ""});
  const handleUserSignup = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation
          })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
        if(!json.success) alert("Enter valid credentials");
    }

    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }

    return (
      
        <div className='h-svh bg-stone-950 p-3'>
  <h1 className='text-4xl text-yellow-200 text-center mt-15'>Sign Up</h1>
  <form className='max-md:items-stretch mt-8 flex flex-col items-center' onSubmit={handleUserSignup}>
    <div className='flex flex-col mb-3'>
      <label htmlFor="name" className='text-lime-400 text-lg' >Name</label>
      <input name='name' className="max-md:w-full border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5 w-80" type="text" value={credentials.name}  onChange={onChange}/>
    </div>

    <div className='flex flex-col mb-3'>
      <label htmlFor="email"  className='text-lime-400 text-lg'>Email</label>
      <input name="email" className="max-md:w-full border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5 w-80" type="text" value={credentials.email}  onChange={onChange}/>
    </div>

    <div className='flex flex-col mb-3'>
      <label htmlFor="password" className='text-lime-400 text-lg'>Password</label>
      <input name='password' className="max-md:w-full border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5 w-80" type="password" value={credentials.password} onChange={onChange}/>
    </div>
  <div className='flex flex-col mb-6'>
      <label htmlFor="geolocation"  className='text-lime-400 text-lg'>Address</label>
      <input name='geolocation' className="max-md:w-full border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5 w-80" type="text" value={credentials.geolocation} onChange={onChange}/>
    </div>

      <div className='max-md:flex-col items-center max-md:gap-2 flex gap-5 '>
  <button type='submit' className='max-md:w-full bg-transparent hover:bg-amber-400 text-md px-5 py-1 rounded-md text-amber-300 hover:text-white border-[1.2px] border-amber-300 transition-colors duration-300 cursor-pointer'>
      Submit
    </button>
    <Link to="/login" className="max-md:w-full text-center bg-transparent hover:bg-orange-500 text-md px-5 py-[5.2px] rounded-md text-orange-400 hover:text-white border-[1.9px] border-orange-400 transition-colors duration-300 cursor-pointer">Already a user</Link>

      </div>
  
  </form>
</div>

        )
    }


export default Signup