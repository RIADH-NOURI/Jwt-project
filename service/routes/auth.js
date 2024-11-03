import express from 'express';
import { generateToken, refreshToken } from '../controllers/authController.js';
import authenticateToken from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/login', generateToken);
router.post('/refresh', refreshToken);

router.get('/protected', authenticateToken, async (req, res) => {
    try {
        res.json({ message: 'Access granted' });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

export default router; 
