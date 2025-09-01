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


const allOrders = (req, res) =>{

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


const updateStatus = (req, res) =>{

} ;


export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus} ;