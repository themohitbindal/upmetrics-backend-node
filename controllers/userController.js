import User from '../models/User.js';

// Create user
export const createUser = async (req, res) => {
  try {
    const { email, name, age, profileImage } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    const user = await User.create({
      email,
      name,
      age,
      profileImage,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message,
    });
  }
};

// Get single user (me)
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

    res.status(200).json({
      success: true,
      data: user,
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

    const updates = { name, age, profileImage };

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

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};


