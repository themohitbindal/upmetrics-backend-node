import express from 'express';
import {
  getCategories,
  createCategory,
  notAllowedUpdateCategory,
  notAllowedDeleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Manage task categories
 *
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, slug]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Health tasks"
 *               slug:
 *                 type: string
 *                 example: "health-tasks"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request - validation error
 * /api/categories/{id}:
 *   put:
 *     summary: Updating categories is not allowed
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       405:
 *         description: Updating categories is not allowed
 *   delete:
 *     summary: Deleting categories is not allowed
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       405:
 *         description: Deleting categories is not allowed
 */
router
  .route('/')
  .get(getCategories)
  .post(createCategory);

router
  .route('/:id')
  .put(notAllowedUpdateCategory)
  .delete(notAllowedDeleteCategory);

export default router;


