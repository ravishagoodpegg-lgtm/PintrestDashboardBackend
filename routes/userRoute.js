import express from 'express'
import {saveUser , deleteUser, loginUser} from '../controllers/userController.js'





const router = express.Router();
router.post("/register",saveUser)
router.post("/delete",deleteUser)
router.post('/login',loginUser)

export default router;