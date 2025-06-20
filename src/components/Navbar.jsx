import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-stone-800 text-white py-2 px-4  ">
      <nav className="flex  justify-between ">
        <div className='text-3xl font-bold italic'>GoFood</div>

        <ul className=" flex gap-8  list-none items-center">


          <li className='text-sm text-stone-200'><Link to="#">Home</Link></li>
          <li className='text-sm text-stone-200'><Link to="#">Login</Link></li>

        </ul>
        <div className=' flex items-center'>
          <form className='flex  items-center'>
            <input type="text" placeholder='Type here to search' className='bg-transparent  text-stone-300 w-50 border-[1.2px] border-green-700 outline-0 text-[13px] pl-4 pr-8.5 rounded-3xl py-1.5'/>
          <button type='submit' className='text-stone-300 active:text-white rounded-2xl  absolute p-1.5 right-5 text-lg cursor-pointer'><CiSearch /></button>
          </form>
          
        </div>


      </nav>
    </div>
  )
}

export default Navbar
