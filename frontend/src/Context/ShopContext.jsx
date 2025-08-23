
import {  createContext } from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext() ;

const ShopContextProvider = (props) =>{

    const  Currency = "$" ;
    const deliveryFee = 10;

    const value = {
        products , Currency , deliveryFee
    }

    return(
        <ShopContext.Provider value={value}>

            {props.children}

        </ShopContext.Provider>
    )
} ;

export default ShopContextProvider ;  
