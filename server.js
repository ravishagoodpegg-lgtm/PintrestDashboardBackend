import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import userRouter from './routes/userRoute.js'
import boardRoutes from './routes/boardRoute.js';
import pinRoutes from './routes/pinsRoute.js';

const app = express()
connectDB();
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())

// Routes
app.get('/',(req,res)=>{
    res.status(200).send("server running")
})

app.use('/user',userRouter)
app.use('/api/boards', boardRoutes);
app.use('/api/pins', pinRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})