import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_ATLAS_URI)
        console.log("connected to database")
    }catch(error){
        console.log("something went wrong while connecting database")
        console.log(error)
    }
}
export default connectDB