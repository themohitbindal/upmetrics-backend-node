import Category from '../models/Category.js';

const DEFAULT_CATEGORIES = [
  { name: 'Daily tasks', slug: 'daily-tasks' },
  { name: 'Sports tasks', slug: 'sports-tasks' },
  { name: 'Reading tasks', slug: 'reading-tasks' },
  { name: 'Creativity tasks', slug: 'creativity-tasks' },
  { name: 'Coding tasks', slug: 'coding-tasks' },
];

const seedCategories = async () => {
  try {
    for (const cat of DEFAULT_CATEGORIES) {
      const existing = await Category.findOne({ slug: cat.slug });
      if (!existing) {
        await Category.create({
          ...cat,
          isSystem: true,
        });
      }
    }
    console.log('Default categories ensured');
  } catch (error) {
    console.error('Error seeding default categories:', error.message);
    throw error;
  }
};

export default seedCategories;


