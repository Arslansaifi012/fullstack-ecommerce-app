import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";


const List = ({token}) =>{

    const [list, setList] = useState([]) ;

    const fetchList = async () => {

            
        try {
            const response = await axios.get(backendUrl + "/api/product/list") ;

            if (response.data.success) {

                setList(response.data.productS) ;
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error.message) ;
            toast.error(error.message) ;
        }

    }

    useEffect(()=>{
        fetchList() ;
    },[]) ;


    return (
        <>

        <p className="mb-2"> All Products LIst</p>

        <div className="flex flex-col gap-2">
             {/* -------------------------  List Table Title  ------------------  */} 


             <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b className="text-center">Action</b>
             </div>

        </div>

        </>
    )
} ;

export default List ;

