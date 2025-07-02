import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { GiHamburgerMenu } from 'react-icons/gi'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'
import Modal from '../Modal'
import Cart from './Cart'
import { useCart } from '../components/ContextReducer'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [foodItem, setFoodItem] = useState([])
  const [foodCat, setFoodCat] = useState([])
  const [search, setSearch] = useState('')
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate()
  const data = useCart()

  const loadData = async () => {
    let response = await fetch("https://fooddeliveryapp-ngmw.onrender.com/api/fooddata", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      }
    })
    response = await response.json()
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleUserLogout = () => {
    localStorage.removeItem("authToken")
    navigate("/")
  }

  return (
    <div className='min-h-screen flex flex-col bg-stone-950'>
      {/* Navbar */}
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
                    {data.length}
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

      {/* Carousal + Cards */}
      <Carousal />
      <div className="flex flex-col px-4 ">
        {foodCat.length > 0 && foodCat.map((cat) => (
          <React.Fragment key={cat._id} >
            <div className='text-white  font-semibold text-2xl max-md:text-[21px] ml-2 mt-7'>{cat.CategoryName}</div>
            <hr className='text- stone-700 mt-1 border-[0.6px]' />
            <div className='flex flex-wrap'>
              {foodItem.length > 0 &&
                foodItem
                  .filter(item =>
                    item.CategoryName === cat.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(filterItems => (
                    <div key={filterItems._id} className='max-sm:w-full'>
                      <Card foodItem={filterItems} options={filterItems.options[0]} />
                    </div>
                  ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
