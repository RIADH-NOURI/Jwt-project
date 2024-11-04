import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt'

export const generateToken = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });
    
    const accessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    const refreshToken = jwt.sign({ user: user._id }, process.env.REFRESH_TOKEN_SECRET,{expiresIn: '7d'});
    user.refreshToken = refreshToken;
        await user.save();
    res.json({ accessToken, refreshToken });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
    
  }

  
};
//refreshToken function
export const refreshToken = (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = User.findById(decoded.user);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const accessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
