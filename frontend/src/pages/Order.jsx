import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { useState } from "react";
import { toast } from "react-toastify";
import axios, { all } from "axios";
import { useEffect } from "react";

const Order = () => {

    const {backendUrl, token, Currency } = useContext(ShopContext) ;

    const [orderData, setOrderDarta] = useState([]) ;

    const loadOrderData = async() =>{

        try {

            if (!token) return null ;

            const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}}) ;
            if(response.data.success){
                let allOrders = [] ;

                response.data.orders.map((order)=>{
                    order.items.map((item)=>{
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date 
                        allOrders.push(item) ;
                    }) ;
                }) ;

                setOrderDarta(allOrders.reverse());
                


            }
            
        } catch (error) {
            console.log(error.message);
            toast.error(error.message) ;
        }

    }

    useEffect(()=>{
        loadOrderData() ;
    },[token]) ;

    



    return (
        <div className="border-t pt-16">

            <div className="text-2xl">
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {
                   orderData.map((item, ind)=>(
                        <div key={ind} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
                            <div className="flex items-start gap-6 text-sm">

                                <img className="sm:w-20 w-16" src={item.image[0]} alt="" />
                                <div>
                                    <p className="sm:text-base font-medium">{item.className}</p>
                                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700 ">
                                        <p className="text-lg">{Currency}{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Size : {item.size}</p>
                                    </div>
                                    <p className="mt-2">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                                    <p className="mt-2">payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                                </div>
                            </div>

                            <div className="md:w-1/2 flex justify-between">

                               <div className="flex items-center gap-2">

                                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                <p className="text-sm md:text-base">{item.status}</p>
                                </div>

                                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
                             

                            </div>

                        </div>
                    ))
                }
            </div>

        </div>
    )
} ;

export  default Order ; 