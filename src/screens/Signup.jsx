import React, { useState } from 'react'
import { Link } from 'react-router-dom'




const Signup = () => {
    
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

        if(!json.success) alert("Enter valid credentials");
    }

    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }

    return (
        <div className='h-svh bg-emerald-900 p-3'>
  <h1 className='text-4xl text-yellow-200 text-center'>Sign Up</h1>
  <form className='mt-20' onSubmit={handleUserSignup}>
    <div className='flex flex-col mb-4'>
      <label htmlFor="name" className='text-lime-400 text-lg' >Name</label>
      <input name='name' className="border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5 w-80" type="text" value={credentials.name}  onChange={onChange}/>
    </div>

    <div className='flex flex-col mb-4'>
      <label htmlFor="email"  className='text-lime-400 text-lg'>Email</label>
      <input name="email" className="border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5 w-80" type="text" value={credentials.email}  onChange={onChange}/>
    </div>

    <div className='flex flex-col mb-6'>
      <label htmlFor="password" className='text-lime-400 text-lg'>Password</label>
      <input name='password' className="border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5 w-80" type="text" value={credentials.password} onChange={onChange}/>
    </div>
  <div className='flex flex-col mb-6'>
      <label htmlFor="geolocation"  className='text-lime-400 text-lg'>Address</label>
      <input name='geolocation' className="border border-lime-400 mt-1 text-lime-200 outline-0 rounded-md bg-green-900/30 px-3 py-1.5 w-80" type="text" value={credentials.geolocation} onChange={onChange}/>
    </div>

    <button type='submit' className='bg-transparent hover:bg-amber-400 text-md px-5 py-1 rounded-md text-amber-300 hover:text-white border-[1.2px] border-amber-300 transition-colors duration-300 cursor-pointer'>
      Submit
    </button>
    <Link to="/login" className="ml-5  bg-transparent hover:bg-orange-500 text-md px-5 py-[5.2px] rounded-md text-orange-400 hover:text-white border-[1.9px] border-orange-400 transition-colors duration-300 cursor-pointer">Already a user</Link>

  </form>
</div>

    )
}

export default Signup