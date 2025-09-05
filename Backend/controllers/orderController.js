import orderModel from "../models/orderModels.js";
import userModel from "../models/userMoel.js";

const placeOrder = async(req, res) =>{

    try {
        const {userId, items, amount, address} = req.body ;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'cod',
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData) ;
        await newOrder.save() ;

         await userModel.findByIdAndUpdate(userId,{cartData:{}}) ;
         res.json({success:true, message:'placed Order Successfully'}) ;

    } catch (error) {
        
        console.log(error.message) ;
        res.json({success:false, message:error.message}) ;

        
    }

}

const placeOrderStripe = async(req, res) =>{

};


const placeOrderRazorpay = (req, res) =>{

};

// All Order data for admin panel
const allOrders = async (req, res) =>{

    try {
        const allOrders = await orderModel.find({}) ;
        res.json({success:true,allOrders})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:true, message:error.message}) ;
    }

};


const userOrders = async(req, res) =>{

    try {
        const {userId} = req.body ;
        const orders = await orderModel.find({userId}) ;
        // console.log(orders);
        res.json({success:true, orders}) ;

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message}) ;
        
    }

}; 


const updateStatus = async(req, res) =>{

    try {
        const {orderId, status} = req.body ;

        await orderModel.findByIdAndUpdate(orderId, {status}) ;
        res.json({success:true, message:'status Updated'});
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message}) ;
        
    }

} ;


export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus} ;