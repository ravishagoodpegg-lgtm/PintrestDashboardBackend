import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const saveUser = async(req,res) =>{
    try{
        const { name, email, password ,avatarURL} = req.body;
        
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({ message: "User already exists" })
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        const create = await User.create({
            name,
            email,
            password:hashedPassword,
            avatarURL
        })
        
        const token = jwt.sign({
            id : create._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        })
        
        res.status(201).json({
            success : true,
            user: create,
            token
        });

    }catch(error){
        res.status(500).json({ error: error.message })
    }
}

const loginUser = async(req,res) =>{
    const {email , password} = req.body ;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
            ;
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        )
        if(!isPasswordValid){
            return res.status(404).json({
                message : "invalid credentials"
            })
            
        }

        const token = jwt.sign({
            id : user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        }
    )
        return res.status(200).json({
            message : "User LoggedIn successfully",
            user,
            token
        })

    }catch(error){
        return res.status(500).json({
            message : "Internal Server Error",
        })
    }
}

const deleteUser = async(req,res) =>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        
        await User.deleteOne({email})

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    }catch(error){
        res.status(500).json({ error: error.message })
    }
}

export { saveUser, deleteUser , loginUser }