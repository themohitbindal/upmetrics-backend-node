import Category from '../models/Category.js';

// get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message,
    });
  }
};

// create new (non-system) category
export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are required',
      });
    }

    const category = await Category.create({
      name,
      slug: slug.toLowerCase(),
      isSystem: false,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating category',
      error: error.message,
    });
  }
};

// block updates
export const notAllowedUpdateCategory = async (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Updating categories is not allowed',
  });
};

// block deletes
export const notAllowedDeleteCategory = async (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Deleting categories is not allowed',
  });
};


