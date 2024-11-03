import express from 'express';
import { CreateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', CreateUser);

export default router;