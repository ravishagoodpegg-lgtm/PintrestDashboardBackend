import mongoose from "mongoose";
const boardSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
    },
    description:{
        type:String,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    coverImage : {
        type : String,
        required : true
    },
    isPrivate : {
        type : Boolean,
        default : false
    }
},{ timestamps: true, versionKey: false })
const Board = mongoose.model("Board",boardSchema)
export default Board