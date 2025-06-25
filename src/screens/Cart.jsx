import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { GoTrash } from "react-icons/go";


const Cart = () => {


let data = useCart() || [];
let dispatch = useDispatchCart();
if (!data || data.length === 0) {
    return (<div className='text-3xl font-semibold text-stone-200  text-center'>
         Cart is Empty!
    </div>);
}

const handleCheckOut = async() => {
  let userEmail = localStorage.getItem("userEmail");
  let response = await fetch("https://fooddeliveryapp-ngmw.onrender.com/api/orderdata", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      order_data: data,
      email: userEmail,
      order_date: new Date().toDateString()
    })
  });
  console.log("order response:", response);
  if(response.status===200){
    dispatch({type: "DROP"});
  }
}

let totalPrice = Array.isArray(data) ? data.reduce((totalPrice, food) => totalPrice + food.price, 0) : 0;

  return (
    <div className="bg-stone-800 min-h-screen p-6 ">
  <h1 className="text-center text-4xl font-semibold text-stone-200 mb-6">My Cart</h1>

  <div className="overflow-x-auto rounded-lg shadow-md ">
    <table className=" w-full table-auto border-collapse bg-stone-700">
      <thead>
        <tr className="bg-stone-900 max-[594px]:text-xs max-sm:text-sm text-green-400 text-left text-lg">
          <th className="py-3 px-4">S.no</th>
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Quantity</th>
          <th className="py-3 px-4">Option</th>
          <th className="py-3 px-4">Amount</th>
          <th className="py-3 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((food, index) => (
          <tr key={index} className="text-stone-200 border-t border-stone-600 hover:bg-stone-600 max-[594px]:text-xs max-sm:text-sm ">
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{food.name}</td>
            <td className="py-2 px-4">{food.qty}</td>
            <td className="py-2 px-4">{food.size}</td>
            <td className="py-2 px-4">₹{food.price}</td>
            <td className="py-2 px-4">
              <button
                type="button"
                onClick={() => dispatch({ type: "REMOVE", index })}
                className="hover:opacity-80 transition-opacity duration-200"
              >
                <GoTrash  className="w-5 h-5"  />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="mt-6 flex justify-between items-center text-stone-200 text-lg font-semibold">
    <span>Total Price: ₹{totalPrice}/-</span>
    <button className="bg-green-600 hover:bg-green-700 text-stone-100 py-1.5 px-3.5 rounded-md transition-all duration-300 text-[15px] cursor-pointer
    
    " onClick={handleCheckOut}>
      Checkout
    </button>
  </div>
</div>

  )
}

export default Cart
