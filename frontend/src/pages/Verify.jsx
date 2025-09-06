import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () =>{

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext) ;
    const [searParams, setSearchParams] = useSearchParams() ;

    const success = searParams.get('success') ;
    const orderId = searParams.get('orderId') ;

    const verifyPayment = async() =>{

        try {
            if (!token) return null

            const response = await axios.post(backendUrl + '/api/order/verifyStripe',{success, orderId}, {headers:{token}}) ;
            
            if(response.data.success){
                setCartItems({}) ;
                navigate('/order') ;
            }else{
                navigate('/cart') ;
            }
            

        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(()=>{
        verifyPayment() ;
    },[token]) ;


    return (
        <div>

        </div>
    )
} ;

export default Verify ;