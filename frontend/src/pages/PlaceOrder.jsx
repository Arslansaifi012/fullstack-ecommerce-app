import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import { data } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () =>{
    const {navigate,backendUrl, token, cartItems, setCartItems, getCartAmount, deliveryFee, products} = useContext(ShopContext) ;
    const [method, setMethod] = useState('cod') ;

    const[formData, setFormData] = useState({
        firstName:'',
        lastName:''  ,
        email:'',
        street:'',
        city:'',
        state:'',
        zipCode:'',
        country:'',
        phone:''
    }) ;

    const onChangehandler = (e) =>{

        const name = e.target.name ;
        const value = e.target.value ;

        setFormData(data => ({...data, [name]:value})) ;
    }

    const onSubmitHandler = async(e) =>{
        e.preventDefault() ;

        try {
            
            let orderItems = [] ;

            for(const items in cartItems){
                for(const item in cartItems[items]){
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id===items)) ;
                        if (itemInfo) {
                            itemInfo.size = item ;
                            itemInfo.quantity = cartItems[items][item] ;
                            orderItems.push(itemInfo)
                        }
                    } 
                }
            }

            let orderData = {
                address:formData ,
                items:orderItems,
                amount:getCartAmount() + deliveryFee ,
                 date: Date.now() 
            }

            switch (method) {
                case 'cod':
                    const responce = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}}) ;
                    if(responce.data.success){
                        setCartItems({}) ;
                        navigate('/order')
                    }else{
                        toast.error(responce.data.message) ;
                    }
                    break;

                    case 'stripe':
                        const responceStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}}) ;
                        if(responceStripe.data.success){
                            const {session_url} = responceStripe.data ;
                            window.location.replace(session_url) ;
                            
                        }else{
                            toast.error(responceStripe.data.message);
                        }
            
                default:
                    break;
            }
            

        } catch (error) {
            console.log(error.message);
            toast.error(error.message) ;
            
        }
        
    }
  

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={'INFORMATION'} />
                    
                </div>

                <div className="flex gap-3 ">
                    <input onChange={onChangehandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="First name" type="text"  required/>
                    <input onChange={onChangehandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="Last name" type="text"  required/>
                </div>

                <input onChange={onChangehandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="Email address" type="email" required />
                <input onChange={onChangehandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="Street" type="text"  required/>

                    <div className="flex gap-3 ">
                    <input onChange={onChangehandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="City" type="text"  required/>
                    <input onChange={onChangehandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="State" type="text" required />
                </div>

                    <div className="flex gap-3 ">
                    <input  onChange={onChangehandler} name="zipCode" value={formData.zipCode} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="Zip Code" type="number"  required/>
                    <input onChange={onChangehandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="Country" type="text"  required/>

                </div>

                <input onChange={onChangehandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5  w-full " placeholder="Phone" type="number" required />
            </div>

            <div className="mt-8">
                <div className="mt-8 min-w-80">

                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'}/> 
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />

                        </div>

                          <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
                        </div>

                          <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                             <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button type="submit"  className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>

                    </div>

                </div>

            </div>

        </form>
    )
} ;

export default PlaceOrder  ;
