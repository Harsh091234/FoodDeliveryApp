
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
// Import the search icon from react-icons
import { CiSearch } from "react-icons/ci";

const Navbar = (props) => {
    const [cartView, setCartView] = useState(false);
    const [search, setSearch] = useState('');
    localStorage.setItem('temp', "first");
    let navigate = useNavigate();
    const handleUserLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const loadCart = () => {
        setCartView(true);
    };

    const items = useCart();
    return (
        <div>
            <div className="bg-stone-700 text-white  py-2 px-4  ">
                <nav className="flex  justify-between ">
                    <div className='text-3xl font-bold italic'>GoFood</div>

                    <ul className=" flex gap-10 list-none items-center">

                        <div className='flex gap-5'>
                            <li className='text-sm text-stone-200'><Link to="/">Home</Link></li>
                            {
                                (localStorage.getItem("authToken"))
                                    ? <li className='text-sm text-stone-200'>
                                        <Link to="/myorder">My Orders</Link>
                                    </li>
                                    : ""
                            }
                        </div>

                        <div>

                        </div>
                        {(!localStorage.getItem("authToken"))
                            ? <li className='text-sm text-white py-1.5 px-3 hover:bg-green-700 rounded-2xl bg-green-600 cursor-pointer'><Link to="/login">Login</Link></li>
                            :
                            <div className='flex gap-1.5'>
                                <li onClick={() => setCartView(true)} className="relative text-sm text-stone-800 font-medium py-1.5 px-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
                                    MyCart
                                    <span className="absolute  top-0 right-0 text-[10px] font-bold text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                                        {items.length}
                                    </span>
                                </li>
                                {
                                    cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null
                                }


                                <li onClick={handleUserLogout} className='text-sm text-white py-1.5 px-3  rounded-2xl bg-red-600 hover:bg-red-700  cursor-pointer'>Logout </li>
                            </div>



                        }


                    </ul>
                    <div className=' flex items-center'>
                        <div className='flex  items-center'>
                            <input type="search" placeholder='Type here to search' className='bg-transparent  text-stone-300 w-50 border-[1.2px] border-green-700 outline-0 text-[13px] pl-4 pr-8.5 rounded-3xl py-1.5' onChange={(e) => setSearch(e.target.value)} value={search} />
                            <button type='submit' className='text-stone-300 active:text-white rounded-2xl  absolute p-1.5 right-5 text-lg cursor-pointer'><CiSearch /></button>
                        </div>

                    </div>


                </nav>
            </div>
        </div>
    )
}

export default Navbar
