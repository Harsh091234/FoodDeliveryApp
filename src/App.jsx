import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './screens/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './screens/Login'
import Signup from './screens/Signup'
import { CartProvider } from './components/ContextReducer'
import Cart from './screens/Cart'
import MyOrder from './screens/MyOrder'

function App() {



  return (
    <CartProvider>
       <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
           <Route exact path="/myorder" element={<MyOrder />} />
         

        </Routes>
      </div>
    </Router>
    </CartProvider>
   
  )
}

export default App
