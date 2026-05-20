import Board from "../models/Board.js";

export const getBoards = async(req,res) =>{
    const userId = req.user.id
    try{
        const boards = await Board.find({userId}).sort({ createdAt: -1 });
        res.json(boards)
    }catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const createBoard = async(req,res) => {
    try{
        const board = await Board.create({...req.body , userId : req.user.id})
        res.status(201).json(board);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}