
import {  createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import Login from "../pages/Login";
import { data, useNavigate } from "react-router-dom";
import axios from 'axios' ; 




export const ShopContext = createContext({
     getCartCount: () => 0,   
  setShowSearch: () => {}
}) ;

const ShopContextProvider = (props) =>{

    const  Currency = "$" ;
    const backendUrl = import.meta.env.VITE_BACKEND_URL ;
    const deliveryFee = 10 ;
    const [search, setSearch] = useState('') ;
    const [showSearch, setShowSearch] = useState(false) ;
    const [cartItems, setCartItems] = useState({}) ;
    const [products, setProducts] = useState([]) ;
    const [token, setToken] = useState('') ;
    const navigate = useNavigate() ;


    const addTocart = async (itemId, size) =>{

        if (!size) {
            toast.error('Please Select Product Size') ;
            return ;
        }

        let cartData = structuredClone(cartItems) ;

        if (cartData[itemId]) {
           
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }else {
                cartData[itemId][size] = 1 ;
            }
            
        }else {
            cartData[itemId] = {} ;
            cartData[itemId][size] = 1 ;
        }

        setCartItems(cartData) ;
    } ;

    const getCartCount = () =>{
        let totalCount = 0 ;

        for(const items in cartItems) {
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount+= cartItems[items][item] ;
                        
                    }
                } catch (error) {
                    toast.error(error.message)
                    console.log(error.message,'cart error');
                }
            } 
        }
        return totalCount ;
    } 

    const updateQuantity = (itemId, size, quantity) =>{
        let cartData = structuredClone(cartItems) ;
        cartData[itemId][size] = quantity ;
        setCartItems(cartData) ;
    }

    const getCartAmount = () => {

        let totalAmount = 0 ;

        for (const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);  
            
            for(const item in cartItems[items]){
                try {

                    if (cartItems[items][item] > 0) {

                        totalAmount += itemInfo.price * cartItems[items][item] ;
                        
                    }
                    
                } catch (error) {
                    console.log(error.message,'getCartAmount Error');
                    
                }
            }
        }

        return totalAmount ;
    }

    const getproductData = async () =>{
        try {
            const response = await axios.get(backendUrl + '/api/product/list') ;
            console.log(response.data.productS);

            if (response.data.success) {
                setProducts(response.data.productS) ;
            }else{
               console.log(response.data.message);

            }
            
        } catch (error) {
            console.log(error.message);
            
        }
        
    }

    useEffect(()=>{

        getproductData() ;

    },[]) ;

    const value = {
        products , Currency , deliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addTocart ,
        getCartCount ,
        updateQuantity,getCartAmount,
        navigate,setToken,token,backendUrl
    }

    return(
        <ShopContext.Provider value={value}>

            {props.children}

        </ShopContext.Provider>
    )
} ;

export default ShopContextProvider ;  
