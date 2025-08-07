
import mongoose from "mongoose"; 

const connectTodb = async () =>{

    mongoose.connection.on('connected', ()=>{
        console.log("DB Connected Successfully..")
    }) ;

    await mongoose.connect(`mongodb+srv://codearslanx:Arslan786$$$@cluster0.fhm6e5j.mongodb.net/e-commerce`) ;

}

export default connectTodb ;
