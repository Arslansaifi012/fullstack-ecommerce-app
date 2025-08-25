
import {  createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import Login from "../pages/Login";


export const ShopContext = createContext({
     getCartCount: () => 0,   
  setShowSearch: () => {}
}) ;

const ShopContextProvider = (props) =>{

    const  Currency = "$" ;
    const deliveryFee = 10;
    const [search, setSearch] = useState('') ;
    const [showSearch, setShowSearch] = useState(false) ;
    const [cartItems, setCartItems] = useState({}) ;

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

    const value = {
        products , Currency , deliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addTocart ,
        getCartCount ,
        updateQuantity
    }

    return(
        <ShopContext.Provider value={value}>

            {props.children}

        </ShopContext.Provider>
    )
} ;

export default ShopContextProvider ;  
