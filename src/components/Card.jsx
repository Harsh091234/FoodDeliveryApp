import React, { useState } from 'react';
import { useCart, useDispatchCart } from "./ContextReducer"

const Card = (props) => {
  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItem;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || "");
  let dispatch = useDispatchCart();
  let data = useCart() || [];
  let finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = null;
    for (const item of data) {
      if(item.id === props.foodItem._id){
        food = item;
        break;
      }
    }
    if(food !== null){
      if(food.size === size){
        await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty})
        return 
      }
      else if(food.size !== size){
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size
        })
        return
      }
      return
    }

    



    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size
    });
    console.log(data);
  }

  return (
    <div className=''>
      <div className="card mt-5 ml-3 max-sm:ml-0 w-68 max-md:w-63 max-[430px]:ml-0 bg-stone-700 rounded-lg overflow-hidden border border-stone-500 transition-transform duration-300 ease-in-out hover:scale-[1.02]  max-sm:px-3 max-sm:mt-2 hover:shadow-lg max-sm:w-full">

        <div className='max-sm:px-8 '>
          <img
            src={props.foodItem.img}
            alt=""
            className='card-img max-sm:mt-4 max-sm:mb-3  h-46 max-md:h-41 max-sm:h-54 w-full object-fill max-sm:rounded-md transition-opacity duration-300 hover:opacity-90'
          />
        </div>

        <div className="card-body mt-1 transition-all duration-300 px-2">
          <h1 className="text-xl max-md:text-lg text-white text-center font-bold transition-colors duration-300">
            {props.foodItem.name}
          </h1>

          <p className="text-md max-md:text-xs text-white text-center mt-1">
            This is card
          </p>

          <div className="flex justify-between items-center px-5 mt-2 gap-2">
            <select className='bg-stone-300 outline-0 rounded-md text-md max-md:text-xs font-semibold py-0.5 px-1.5 transition-all duration-200 hover:bg-stone-200' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className='bg-stone-300 outline-0 rounded-md text-md max-md:text-xs font-semibold py-0.5 px-1.5 transition-all duration-200 hover:bg-stone-200' value={size} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center'>
            <h1 className='text-lg max-md:text-[17px] text-yellow-300 font-semibold mt-2 mb-2.5 transition-colors duration-300'>
              Price: {finalPrice}
            </h1>
            <button
              className="h-[26px] w-22 cursor-pointer rounded-md ml-auto text-xs 
             bg-stone-900 text-stone-300 border border-transparent 
             mr-2 transition-all duration-300 ease-in-out
             hover:bg-transparent hover:border-stone-300 hover:text-stone-100 hover:shadow-md" onClick={handleAddToCart}>
              Add to cart
            </button>


          </div>


        </div>
      </div>
    </div>
  );
};

export default Card;
