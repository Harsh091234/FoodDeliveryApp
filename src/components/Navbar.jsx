import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [cartView, setCartView] = useState(false);
    const [search, setSearch] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let navigate = useNavigate();
    const items = useCart();

    const handleUserLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    return (
        <div className="bg-stone-700 text-white py-2 px-4">
            <nav className="flex flex-wrap items-center max-[830px]:justify-between w-full gap-4">
                {/* Logo */}
                <div className="text-3xl font-bold italic">GoFood</div>

                {/* Hamburger */}
                <div className='min-[830px]:hidden flex items-center'>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-[26px] text-stone-200 hover:text-stone-300 cursor-pointer'>
                        <GiHamburgerMenu />
                    </button>
                </div>

                {/* Nav Links - Desktop */}
                <div className="hidden min-[830px]:flex items-center ml-auto mr-20 min-[1200px]:mr-50">
                    <ul className="flex gap-5 list-none items-center">
                        <li className="text-sm text-stone-200">
                            <Link to="/">Home</Link>
                        </li>
                        {localStorage.getItem("authToken") && (
                            <li className="text-sm text-stone-200">
                                <Link to="/myorder">My Orders</Link>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Search Bar - Desktop */}
                <div className="flex items-center relative max-[830px]:hidden">
                    <input
                        type="search"
                        placeholder="Type here to search"
                        className="bg-transparent text-stone-300 w-48 sm:w-64 border-[1.2px] border-green-700 outline-none text-[13px] pl-4 pr-10 rounded-3xl py-1.5"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 text-lg text-stone-300 active:text-white"
                    >
                        <CiSearch />
                    </button>
                </div>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-3">
                    {!localStorage.getItem("authToken") ? (
                        <li className="text-sm text-white py-1.5 px-3 hover:bg-green-700 rounded-2xl bg-green-600 cursor-pointer list-none">
                            <Link to="/login">Login</Link>
                        </li>
                    ) : (
                        <>
                            <li
                                onClick={() => setCartView(true)}
                                className="relative text-sm text-stone-800 font-medium py-1.5 px-3 rounded-2xl bg-yellow-400 hover:bg-yellow-500 cursor-pointer list-none"
                            >
                                MyCart
                                <span className="absolute -top-1 -right-1 text-[10px] font-bold text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                                    {items.length}
                                </span>
                            </li>

                            {cartView && (
                                <Modal onClose={() => setCartView(false)}>
                                    <Cart />
                                </Modal>
                            )}

                            <li
                                onClick={handleUserLogout}
                                className="text-sm text-white py-1.5 px-3 rounded-2xl bg-red-600 hover:bg-red-700 cursor-pointer list-none"
                            >
                                Logout
                            </li>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="min-[800px]:hidden mt-2 bg-stone-800 rounded-xl p-4 space-y-3">
                    <ul className="flex flex-col gap-3 list-none">
                        <li>
                            <Link to="/" className="text-white text-sm" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        </li>
                        {localStorage.getItem("authToken") && (
                            <li>
                                <Link to="/myorder" className="text-white text-sm" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                            </li>
                        )}
                    </ul>
                    <div className="relative mt-3">
                        <input
                            type="search"
                            placeholder="Search..."
                            className="bg-transparent text-stone-300 w-full border-[1.2px] border-green-700 outline-none text-[13px] pl-4 pr-10 rounded-3xl py-1.5"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg text-stone-300 active:text-white"
                        >
                            <CiSearch />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
