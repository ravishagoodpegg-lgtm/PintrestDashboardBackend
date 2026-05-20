import mongoose from "mongoose"
const pinsSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    imageUrl:{
        type : String,
        required : true
    },
    tags:[{ type : String}],
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    boardId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Board",
        required : true
    },
    likes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    saves:[{
        userId : {type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
        boardId : {type:mongoose.Schema.Types.ObjectId , ref:"Board" , required:true}

    }]

},{ timestamps: true, versionKey: false })
const Pin = mongoose.model("Pin",pinsSchema)
export default Pin