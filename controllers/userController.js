import User from '../models/User.js';
import { getFileUrl } from '../middleware/uploadMiddleware.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get single user (me) ; todo: remove later if not used (beacuse I am sending this info at the time of signup and signin)
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Convert file path to URL if it's a local file
    const userData = user.toObject();
    if (userData.profileImage) {
      userData.profileImage = getFileUrl(userData.profileImage);
    }

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// Update user (email cannot be changed)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, age, profileImage } = req.body;

    if (email) {
      return res.status(400).json({
        success: false,
        message: 'Email cannot be updated',
      });
    }

    const updates = { name, age };

    // Handle file upload - if file was uploaded, use the filename
    if (req.file) {
      // Get current user to delete old image
      const currentUser = await User.findById(id);
      if (currentUser && currentUser.profileImage) {
        // Only delete if it's a local file (not a URL)
        if (!currentUser.profileImage.startsWith('http://') &&
          !currentUser.profileImage.startsWith('https://')) {
          const oldImagePath = path.join(__dirname, '..', 'public', 'uploads', currentUser.profileImage);
          // Delete old image file if it exists
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      }
      // Store just the filename (not full path)
      updates.profileImage = req.file.filename;
    } else if (profileImage !== undefined) {
      // If profileImage is provided in body (URL or filename), use it
      // This allows updating with URL or keeping existing image
      updates.profileImage = profileImage;
    }

    const user = await User.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Convert file path to URL for response
    const userData = user.toObject();
    if (userData.profileImage) {
      userData.profileImage = getFileUrl(userData.profileImage);
    }

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};


