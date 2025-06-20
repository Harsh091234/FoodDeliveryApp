import React from 'react'

const Card = () => {
  return (
    <div>
        <div className='card mt-10 ml-3  bg-green-700 h-88 w-60 rounded-lg overflow-hidden border-green-700 border-1 '>
                        <div><img src="/images/121.webp" alt="" className='card-img w-full object-cover' /></div>
                        <div className="card-body  mt-1">
                            <h1 className="mt-card-title text-xl text-center font-bold">My card</h1>
                            <p className="card-text text-center text-sm">This is card</p>
                            <div className="px-5 container flex justify-between mt-2 ">
                                <select className='bg-stone-300 outline-0 rounded-md text-sm font-semibold py-0.5 px-1.5'>
                                    {Array.from(Array(6), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })}
                                </select>
                                <select className='bg-stone-300 font-semibold outline-0 rounded-md text-sm py-0.5 px-1.5'>
                                    <option value="">Half</option>
                                    <option value="">Regular</option>
                                    <option value="">Large</option>
                                </select>
                            </div>
                            <h1 className='mb-2.5 mt-2  text-center font-semibold text-yellow-300'>
                                Total Price: 900 Rs
                            </h1>
                        </div>
                    
                    </div>
    </div>
  )
}

export default Card



                    