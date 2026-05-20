import express from 'express';
import { protect } from '../middleware/auth.js';
import { getBoards, createBoard } from '../controllers/boardController.js';
const router = express.Router();
router.get('/', protect, getBoards);
router.post('/', protect, createBoard);
export default router;