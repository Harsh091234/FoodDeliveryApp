import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState(null)

    const fetchMyOrder = async () => {
        const res = await fetch("https://fooddeliveryapp-ngmw.onrender.com/api/myorderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        });
        const response = await res.json();
        setorderData(response);
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-stone-950">
            <Navbar />

            <div className="container mx-auto px-4 flex-1">
                <div className="flex flex-wrap -mx-2 mt-8">

                    {orderData && orderData.orderData && orderData.orderData.order_data
                        ? orderData.orderData.order_data.slice(0).reverse().map((item, idx) => (
                            <React.Fragment key={idx}>
                                {item.map((arrayData, i) => (
                                    arrayData.Order_date ? (
                                        <div className="w-full text-center mt-8" key={i}>
                                            <span className="text-lg font-semibold text-stone-200">{arrayData.Order_date}</span>
                                            <hr className="my-2 border-stone-600" />
                                        </div>
                                    ) : (
                                        <div className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-6" key={i}>
                                            <div className="bg-stone-700 rounded-lg shadow-md overflow-hidden flex flex-col h-full border-1 border-stone-500">
                                                
                                                <div className="p-4 flex flex-col flex-1">
                                                    <h5 className="text-lg font-bold mb-2 text-stone-300">{arrayData.name}</h5>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        <span className="bg-gray-200 rounded px-2 py-1 text-sm">{arrayData.qty}</span>
                                                        <span className="bg-gray-200 rounded px-2 py-1 text-sm">{arrayData.size}</span>
                                                        
                                                    </div>
                                                    <div className="mt-auto text-sky-500 font-semibold text-lg">
                                                        ₹{arrayData.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </React.Fragment>
                        ))
                        : <div className="w-full text-center mt-20 text-stone-400 text-xl">No orders found.</div>
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}
