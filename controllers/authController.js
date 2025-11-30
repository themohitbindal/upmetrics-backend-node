import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getFileUrl } from '../middleware/uploadMiddleware.js';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Sign up (create user + return token)
export const signUp = async (req, res) => {
  try {
    const { email, password, name, age, profileImage } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Handle file upload - if file was uploaded, use the filename
    let profileImageValue = profileImage;
    if (req.file) {
      profileImageValue = req.file.filename;
    }

    const user = await User.create({
      email,
      password,
      name,
      age,
      profileImage: profileImageValue,
    });

    const token = createToken(user._id);

    // Convert file path to URL for response
    const userData = user.toObject();
    if (userData.profileImage) {
      userData.profileImage = getFileUrl(userData.profileImage);
    }

    res.status(201).json({
      success: true,
      token,
      data: {
        _id: userData._id,
        email: userData.email,
        name: userData.name,
        age: userData.age,
        profileImage: userData.profileImage,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error signing up',
      error: error.message,
    });
  }
};

// Sign in
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = createToken(user._id);

    // Convert file path to URL for response
    const userData = user.toObject();
    if (userData.profileImage) {
      userData.profileImage = getFileUrl(userData.profileImage);
    }

    res.status(200).json({
      success: true,
      token,
      data: {
        _id: userData._id,
        email: userData.email,
        name: userData.name,
        age: userData.age,
        profileImage: userData.profileImage,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error signing in',
      error: error.message,
    });
  }
};

// Reset password (simple: email + new password)
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and new password are required',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error resetting password',
      error: error.message,
    });
  }
};


